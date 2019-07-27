import React, { Component } from 'react';
import { Instagram } from './canals/Instagram';
import { FullScreenPortal } from 'react-gondola';
import { View, TouchableOpacity, Text } from 'react-native';
import { Navigation } from 'react-gondola/Navigation';

interface State {
  example: null | 'Instagram';
}

const EXAMPLES = { Instagram };

export default class App extends Component<{}, State> {
  state: State = {
    example: 'Instagram',
  };

  render() {
    if (!this.state.example) {
      return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          {Object.keys(EXAMPLES).map(example => (
            <TouchableOpacity
              key={example}
              onPress={() => {
                // @ts-ignore
                this.setState({ example });
              }}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: 'cyan',
                borderRadius: 4,
                marginTop: 8,
              }}
            >
              <Text>{example}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    const Example = EXAMPLES[this.state.example];

    return (
      <>
        <FullScreenPortal>
          <Example />
        </FullScreenPortal>
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 8, right: 8 }}
          onPress={Navigation.instance.back}
        >
          <View style={{ backgroundColor: 'black', borderRadius: 4 }}>
            <Text style={{ color: 'white', margin: 4 }}>Go Back</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
