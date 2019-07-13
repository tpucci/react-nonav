import React from 'react';
import { Text } from 'react-native';

export function StrikeThrough(props: { children: string }) {
  return (
    <Text
      style={{
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
      }}
    >
      {props.children}
    </Text>
  );
}
