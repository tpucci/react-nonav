import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

interface IProps {
  onNext: () => any;
}
export class FirstName extends Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Waht is your first name ?</Text>
        <TextInput placeholder="Type here" />
        <Button title="Next" onPress={this.props.onNext} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFAAAA',
    flex: 1,
    justifyContent: 'space-around'
  }
});
