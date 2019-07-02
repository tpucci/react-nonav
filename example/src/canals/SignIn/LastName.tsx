import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface IProps {
  onNext: () => any;
}
export class LastName extends Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text>LastName</Text>
        <Button title="Next" onPress={this.props.onNext} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FF9999',
    flex: 1,
    justifyContent: 'center'
  }
});
