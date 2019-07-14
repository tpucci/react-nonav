import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

interface Props {
  onNext: () => any;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFAAAA',
    flex: 1,
    justifyContent: 'space-around',
  },
});

export class FirstName extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>What is your first name ?</Text>
        <TextInput placeholder="Type here" />
        <Button title="Next" onPress={this.props.onNext} />
      </View>
    );
  }
}
