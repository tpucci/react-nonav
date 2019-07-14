import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface Props {
  onNext: () => any;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FF9999',
    flex: 1,
    justifyContent: 'center',
  },
});

export class LastName extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>LastName</Text>
        <Button title="Next" onPress={this.props.onNext} />
      </View>
    );
  }
}
