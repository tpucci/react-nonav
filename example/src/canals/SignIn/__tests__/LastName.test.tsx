import React from 'react';
import TestRenderer from 'react-test-renderer';

import { LastName } from '../LastName';

describe('LastName', () => {
  it('renders correctly', () => {
    const testRenderer = TestRenderer.create(<LastName />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
