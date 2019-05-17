import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IProps {}
export class Confirm extends Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Confim</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFF99',
    flex: 1,
    justifyContent: 'center'
  }
});
