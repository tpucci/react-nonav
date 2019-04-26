import React, { ComponentType, FunctionComponent, useEffect } from 'react';
import { Canal } from './Canal';
import { useNavigation } from './NavigationContext';

export const createCanal = (...PagesList: ComponentType[]): FunctionComponent => {
  for (let index = 0; index < PagesList.length; index++) {
    const Page = PagesList[index];
    if (!(React.isValidElement(Page) || typeof Page === 'function')) {
      throw new Error(
        `\`createCanal\` expects its first arguments to be a React component. Received type for argument ${index +
          1}: ${typeof Page}`
      );
    }
  }
  const LocalTransitioner = () => {
    const FirstPage = PagesList[0];
    const navigation = useNavigation();
    useEffect(() => {
      navigation.canalsSubject.next(new Canal(PagesList));
    }, [false]);
    return <FirstPage />;
  };
  return LocalTransitioner;
};
