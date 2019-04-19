import React from 'react';
import { View } from 'react-native';
import TestRenderer from 'react-test-renderer';

import { canal } from '../canal';

describe('canal', () => {
  it('throws an error if first arg is not a Component', () => {
    try {
      canal('aaa');
    } catch (error) {
      expect(error.message).toBe(
        '`canal` expects its first argument to be a React component. Received type: string'
      );
    }
    expect.assertions(1);
  });

  it('renders the first page when mounted', () => {
    const Canal = canal(View);
    const testRenderer = TestRenderer.create(<Canal />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
