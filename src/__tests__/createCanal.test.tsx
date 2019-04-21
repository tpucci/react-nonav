import React from 'react';
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';

import { createCanal } from '../createCanal';

describe('createCanal', () => {
  it('throws an error if first arg is not a Component', () => {
    try {
      createCanal('aaa');
    } catch (error) {
      expect(error.message).toBe(
        '`createCanal` expects its first argument to be a React component. Received type: string'
      );
    }
    expect.assertions(1);
  });

  it('renders the first page when mounted', () => {
    const Canal = createCanal(View);
    const testRenderer = TestRenderer.create(<Canal />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
