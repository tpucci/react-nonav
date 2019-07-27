import React from 'react';
import { Text, View } from 'react-native';

export function Info(props: { children: string }) {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: '#eee',
        borderLeftWidth: 3,
        borderLeftColor: '#00b0ff',
        borderRadius: 4,
        marginBottom: 16,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>ℹ Info</Text>
      <Text style={{ marginTop: 4 }}>{props.children}</Text>
    </View>
  );
}
