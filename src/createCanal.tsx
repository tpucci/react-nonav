import React, { ComponentType, Component as ReactComponent } from 'react';
import { ViewStyle, View, StyleSheet, StyleProp } from 'react-native';
import { Observer } from 'mobx-react/native';
import { fromStream } from 'mobx-utils';
import { Subject, Observable, ConnectableObservable } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  withLatestFrom,
  publish
} from 'rxjs/operators';
import { Navigation } from './Navigation';
import { last } from './utils/Array.last';
import { IBackEvent } from './Navigation/BackHandlerDelegate';
import { withBackContext, WithBackContext } from './withBackContext';
import { StopValidator, IStop } from './StopValidator';
import { createStop } from './createStop';

import { IStop as IIStop } from './Navigation/Stop.d';

type CanalComponentProps<T> = {
  style?: StyleProp<ViewStyle>;
} & T;

export interface ICanal {
  back$: Observable<IBackEvent>;
}

export const createCanal = <
  StopName extends string,
  Stop extends IStop<StopName>,
  Authorizations = { [K in Stop['name']]?: boolean }
>(
  stops: Stop[]
): ComponentType<CanalComponentProps<Authorizations>> => {
  StopValidator.validateList(stops);

  class CanalComponent
    extends ReactComponent<WithBackContext<CanalComponentProps<Authorizations>>>
    implements ICanal {
    constructor(props: WithBackContext<CanalComponentProps<Authorizations>>) {
      super(props);

      this.back$.connect();
      const { style, backContext, ...nextAuthorizations } = props;

      Navigation.instance.fullScreenDelegate.canalsFullScreenStackProperties$.next(
        this.fullScreenStackProperties$
      );
      /**
       * @TODO 19-06-01 Find a way to safely forbid the use of reserved prop `style` in a StopName.
       */
      // @ts-ignore
      this.authorizations$.next(nextAuthorizations);
    }
    static defaultProps = {
      style: StyleSheet.absoluteFill
    };

    canalId = Date.now().toString();

    stopsList = stops.map(stop => ({
      ...stop,
      Component: createStop(
        this,
        stop.onBack,
        stop.name,
        stop.Component,
        stop.props,
        stop.Transitioner
      )
    }));
    authorizations$ = new Subject<Authorizations>();
    progress$ = this.authorizations$.pipe(
      map(authorizations =>
        this.stopsList
          .slice(0)
          .reduce((acc: IIStop[], { name, isFullScreen, Component }) => {
            acc.push({
              Component,
              isAuthorized:
                /**
                 * @TODO 19-06-01 Check if Authorization type can be indexed with StopName type.
                 * See https://github.com/Microsoft/TypeScript/issues/2491.
                 */
                // @ts-ignore
                !!authorizations[name] &&
                (last(acc) ? last(acc)!.isAuthorized : true),
              isFullScreen,
              name
            });
            return acc;
          }, [])
      )
    );

    stack = fromStream(
      this.progress$.pipe(
        map(progressStopsList =>
          progressStopsList.filter(stop => !stop.isFullScreen)
        )
      ),
      []
    );

    fullScreenStackProperties$ = this.progress$.pipe(
      map(progressStopsList => ({
        canalId: this.canalId,
        fullScreenStack: progressStopsList.filter(stop => stop.isFullScreen)
      })),
      distinctUntilChanged(
        (
          { fullScreenStack: previousFullScreenStack },
          { fullScreenStack: nextFullScreenStack }
        ) =>
          previousFullScreenStack.filter(stop => stop.isAuthorized).length ===
          nextFullScreenStack.filter(stop => stop.isAuthorized).length
      )
    );

    /**
     * @TODO Pipe operator cannot infer return type as ConnectableObservable.
     * See https://github.com/ReactiveX/rxjs/issues/2972.
     */
    // @ts-ignore
    back$: ConnectableObservable<
      IBackEvent
    > = this.props.backContext.back$.pipe(
      withLatestFrom(this.progress$),
      map(([_, progress]) => {
        const currentStop = last(progress.filter(stop => stop.isAuthorized));
        if (currentStop) {
          return { target: currentStop.name };
        }
        return { target: null };
      }),
      publish()
    );

    shouldComponentUpdate({
      style,
      ...nextAuthorizations
    }: CanalComponentProps<Authorizations>) {
      /**
       * @TODO 19-06-01 Find a way to safely forbid the use of reserved prop `style` in a StopName.
       */
      // @ts-ignore
      this.authorizations$.next(nextAuthorizations);
      return style !== this.props.style;
    }

    componentWillUnmount() {
      // @ts-ignore @TODO 19-06-01
      this.authorizations$.next({});
      this.authorizations$.complete();
    }

    render() {
      return (
        <View style={this.props.style}>
          <Observer>
            {() =>
              this.stack.current.map(({ name, Component, isAuthorized }) => (
                <Component key={name} isAuthorized={isAuthorized} />
              ))
            }
          </Observer>
        </View>
      );
    }
  }

  // @ts-ignore
  return withBackContext(CanalComponent);
};
