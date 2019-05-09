import React, { ComponentType, Component as ReactComponent } from 'react';
import { ViewStyle, View, StyleSheet, StyleProp } from 'react-native';
import { Observer } from 'mobx-react/native';
import { fromStream } from 'mobx-utils';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

type CanalComponentProps<T> = {
  style?: StyleProp<ViewStyle>;
} & T;

export const createCanal = <
  StopName extends string,
  Stop extends { name: StopName; Component: ComponentType },
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

    stack = fromStream(this.progress$, []);

    constructor(props: CanalComponentProps<Authorizations>) {
      super(props);
      const { style, ...nextAuthorizations } = props;
      /**
       * @TODO 19-06-01 Find a way to safely forbid the use of reserved prop `style` in a StopName.
       */
      // @ts-ignore
      this.authorizations$.next(nextAuthorizations);
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

    render() {
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
