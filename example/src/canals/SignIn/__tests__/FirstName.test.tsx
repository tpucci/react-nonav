import React from 'react';
import TestRenderer from 'react-test-renderer';

import { FirstName } from '../FirstName';

describe('FirstName', () => {
  it('renders correctly', () => {
    const testRenderer = TestRenderer.create(<FirstName />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
