import React, { ComponentType } from 'react';

import { TransitionComponentType } from './transitions/Transition.d';

export interface IStop<T extends string> {
  name: T;
  Component: ComponentType<any>;
  isFullScreen?: boolean;
  onBack?: () => any;
  props?: object;
  Transitioner?: TransitionComponentType;
}

export class StopValidator {
  static validate(stop: IStop<string>) {
    if (!stop.name || typeof stop.name !== 'string') {
      throw new Error('ERR_INVALID_NAME');
    }
    if (
      !(
        React.isValidElement(stop.Component) ||
        typeof stop.Component === 'function'
      )
    ) {
      throw new Error('ERR_INVALID_COMPONENT');
    }
  }

  static validateList(stops: Array<IStop<string>>) {
    for (let index = 0; index < stops.length; index++) {
      const stop = stops[index];
      try {
        StopValidator.validate(stop);
      } catch (error) {
        switch (error.message) {
          case 'ERR_INVALID_NAME':
            throw new Error(
              `\`createCanal\` could not find a valid \`name\` key for argument ${index +
                1}. Received: ${JSON.stringify(stop)}`
            );
          case 'ERR_INVALID_COMPONENT':
            throw new Error(
              `\`createCanal\` could not find a valid \`Component\` key for argument ${index +
                1}. Received: ${JSON.stringify(stop)}`
            );
        }
      }
    }
  }
}
