import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Instagram } from 'react-feather';

describe('Instagram', () => {
  it('renders', () => {
    TestRenderer.create(<Instagram />);
  });
});
