import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {}
export class FirstName extends Component<IProps> {
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
    alignItems: 'center',
    backgroundColor: '#FFAAAA',
    flex: 1,
    justifyContent: 'center',
  },
});
