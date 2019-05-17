import React from 'react';
import TestRenderer from 'react-test-renderer';

import { FullScreenPortal } from '../FullScreenPortal';

describe('FullScreenPortal', () => {
  it('renders the full screen portal', () => {
    const testRenderer = TestRenderer.create(<FullScreenPortal />);
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
