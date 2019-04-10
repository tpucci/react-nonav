import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface Props {}
export class FirstName extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>FirstName</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFAAAA',
  },
});
