import React, { ComponentType, FunctionComponent } from 'react';
import { Navigation } from 'Navigation.store';
import { useNavigation } from './NavigationContext';

export const createCanal = (
  ...Pages: Array<ComponentType<{ navigation: Navigation }>>
): FunctionComponent => {
  for (let index = 0; index < Pages.length; index++) {
    const Page = Pages[index];
    if (!(React.isValidElement(Page) || typeof Page === 'function')) {
      throw new Error(
        `\`createCanal\` expects its first arguments to be a React component. Received type for argument ${index +
          1}: ${typeof Page}`
      );
    }
  }
  const FirstPage = Pages[0];
  const Canal = () => {
    const navigation = useNavigation();
    return <FirstPage navigation={navigation} />;
  };
  return Canal;
};
