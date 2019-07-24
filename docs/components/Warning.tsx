import React from 'react';
import { Text, View } from 'react-native';

export function Warning(props: { children: string }) {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: '#eee',
        borderLeftWidth: 3,
        borderLeftColor: '#fdcb00',
        borderRadius: 4,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>⚠️ Warning</Text>
      <Text style={{ marginTop: 4 }}>{props.children}</Text>
    </View>
  );
}
