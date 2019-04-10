import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface Props {}
export class LastName extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>LastName</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9999',
  },
});
