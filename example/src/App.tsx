import React, { Component } from 'react';
import { Instagram } from './canals/Instagram';
import { SignIn } from './canals/SignIn';
import { FullScreenPortal } from 'react-gondola';
import { View, TouchableOpacity, Text } from 'react-native';

interface State {
  example: null | 'SignIn' | 'Instagram';
}

const EXAMPLES = { SignIn, Instagram };

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
      <FullScreenPortal>
        <Example />
      </FullScreenPortal>
    );
  }
}
