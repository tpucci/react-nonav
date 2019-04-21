import React, { ComponentType, FunctionComponent } from 'react';

export const createCanal = (Page: ComponentType): FunctionComponent => {
  if (!(React.isValidElement(Page) || typeof Page === 'function')) {
    throw new Error(
      `\`createCanal\` expects its first argument to be a React component. Received type: ${typeof Page}`
    );
  }
  return () => <Page />;
};
