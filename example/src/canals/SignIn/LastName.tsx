import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {}
export class LastName extends Component<IProps> {
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
    alignItems: 'center',
    backgroundColor: '#FF9999',
    flex: 1,
    justifyContent: 'center',
  },
});
