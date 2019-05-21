import React from 'react';
import TestRenderer from 'react-test-renderer';

import { Confirm } from '../Confirm';

describe('Confirm', () => {
  it('renders correctly', () => {
    const testRenderer = TestRenderer.create(<Confirm />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
