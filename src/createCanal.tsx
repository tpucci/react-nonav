import React, { ComponentType, Component as ReactComponent } from 'react';
import { ViewStyle, View, StyleSheet, StyleProp } from 'react-native';
import { Observer } from 'mobx-react/native';
import { fromStream } from 'mobx-utils';
import { Subject } from 'rxjs';
import { map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { Navigation } from './Navigation';
import { BackContext } from './Navigation/BackContext';
import { last } from './utils/Array.last';

type CanalComponentProps<T> = {
  style?: StyleProp<ViewStyle>;
} & T;

export const createCanal = <
  StopName extends string,
  Stop extends {
    name: StopName;
    Component: ComponentType;
    isFullScreen?: boolean;
  },
  Authorizations = { [K in Stop['name']]?: boolean }
>(
  stopsList: Stop[]
): ComponentType<CanalComponentProps<Authorizations>> => {
  for (let index = 0; index < stopsList.length; index++) {
    const stop = stopsList[index];
    if (!stop.name || typeof stop.name !== 'string') {
      throw new Error(
        `\`createCanal\` could not find a valid \`name\` key for argument ${index +
          1}. Received: ${JSON.stringify(stop)}`
      );
    }
    if (
      !(
        React.isValidElement(stop.Component) ||
        typeof stop.Component === 'function'
      )
    ) {
      throw new Error(
        `\`createCanal\` could not find a valid \`Component\` key for argument ${index +
          1}. Received: ${JSON.stringify(stop)}`
      );
    }
  }

  class CanalComponent extends ReactComponent<
    CanalComponentProps<Authorizations>
  > {
    static defaultProps = {
      style: StyleSheet.absoluteFill
    };

    static contextType = BackContext;
    context!: React.ContextType<typeof BackContext>;

    canalId = Date.now().toString();

    stopsList = stopsList;
    authorizations$ = new Subject<Authorizations>();
    progress$ = this.authorizations$.pipe(
      map(authorizations =>
        this.stopsList
          .slice(0)
          .reduce((acc: Stop[], stop, _, stopsCandidatesList) => {
            /**
             * @TODO 19-06-01 Check if Authorization type can be indexed with StopName type.
             * See https://github.com/Microsoft/TypeScript/issues/2491.
             */
            // @ts-ignore
            if (authorizations[stop.name]) {
              acc.push(stop);
            } else {
              stopsCandidatesList.splice(1);
            }
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
        (lastFullScreenStackProperties, fullScreenStackProperties) =>
          lastFullScreenStackProperties.fullScreenStack.length ===
          fullScreenStackProperties.fullScreenStack.length
      )
    );

    constructor(props: CanalComponentProps<Authorizations>) {
      super(props);
      const { style, ...nextAuthorizations } = props;
      /**
       * @TODO 19-06-01 Find a way to safely forbid the use of reserved prop `style` in a StopName.
       */
      // @ts-ignore
      this.authorizations$.next(nextAuthorizations);
      Navigation.instance.fullScreenDelegate.canalsFullScreenStackProperties$.next(
        this.fullScreenStackProperties$
      );
    }

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
      // @ts-ignore
      const back$ = this.context.back$
        .pipe(withLatestFrom(this.progress$))
        .pipe(
          map(([_, progress]) => {
            const currentStop = last(progress);
            if (currentStop) {
              return { target: currentStop.name };
            }
            return { target: null };
          })
        );
      return (
        <View style={this.props.style}>
          <Observer>
            {() =>
              this.stack.current.map(({ name, Component }) => (
                <View style={StyleSheet.absoluteFill} key={name}>
                  <Component />
                </View>
              ))
            }
          </Observer>
        </View>
      );
    }
  }

  // @ts-ignore
  return CanalComponent;
};
