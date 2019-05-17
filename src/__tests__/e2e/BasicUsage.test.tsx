import React from 'react';
import TestRenderer from 'react-test-renderer';

import { stopCreator } from '../utils/stopCreator';

import { FullScreenPortal } from '../../FullScreenPortal';
import { createCanal } from '../../createCanal';

describe('BasicUsage', () => {
  it('renders page inside the canal', () => {
    const Canal = createCanal([stopCreator('a'), stopCreator('b')]);
    const testRenderer = TestRenderer.create(
      <FullScreenPortal>
        <Canal a b />
      </FullScreenPortal>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  it('renders page in the full screen portal', () => {
    const Canal = createCanal([stopCreator('a'), stopCreator('b', true)]);
    const testRenderer = TestRenderer.create(
      <FullScreenPortal>
        <Canal a b />
      </FullScreenPortal>
    );
    testRenderer.update(
      <FullScreenPortal>
        <Canal a b />
      </FullScreenPortal>
    );
    expect(testRenderer.toJSON()).toMatchSnapshot();
  });
});
