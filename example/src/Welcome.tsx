import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class Welcome extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: '500', textAlign: 'center', marginBottom: 16 }}>
          Welcome in React Gondola !
        </Text>
        <Text style={{ marginTop: 16 }}>
          Choose an example in the tab bar to explore this example app.
        </Text>
        <Text style={{ marginTop: 16 }}>
          To go back, press the GoBack button in the top left corner.
        </Text>
      </View>
    );
  }
}
