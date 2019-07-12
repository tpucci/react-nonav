import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';

export function describeTransitioner(Transitioner) {
  describe(Transitioner.displayName, () => {
    it('shows its child if direction is forward', () => {
      const testRenderer = TestRenderer.create(
        <Transitioner directionForward>
          <Text testID="child">I should be rendered</Text>
        </Transitioner>
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('hides its child if direction is backward', () => {
      const testRenderer = TestRenderer.create(
        <Transitioner directionForward={false}>
          <Text testID="child">I should not be rendered</Text>
        </Transitioner>
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('snapshots component when direction changed to backward', () => {
      const testRenderer = TestRenderer.create(
        <Transitioner directionForward>
          <Text testID="child">I should not be rendered</Text>
        </Transitioner>
      );
      testRenderer.update(
        <Transitioner directionForward={false}>
          <Text testID="child">I should not be rendered</Text>
        </Transitioner>
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('shows its child if direction changed to forward', () => {
      const testRenderer = TestRenderer.create(
        <Transitioner directionForward={false}>
          <Text testID="child">I should rendered</Text>
        </Transitioner>
      );
      testRenderer.update(
        <Transitioner directionForward>
          <Text testID="child">I should be rendered</Text>
        </Transitioner>
      );
      expect(testRenderer.toJSON()).toMatchSnapshot();
    });
  });
}
