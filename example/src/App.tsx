import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Navigation } from 'react-gondola';
import { FullScreenPortal, Canal, Screen } from 'react-gondola';
import { Instagram } from './canals/Instagram';
import { Welcome } from './Welcome';

interface State {
  example: null | 'Instagram' | 'Welcome';
}

const EXAMPLES = { Welcome, Instagram };

export default class App extends Component<{}, State> {
  state: State = {
    example: 'Welcome',
  };

  render() {
    return (
      <>
        <FullScreenPortal>
          <Canal style={{ flex: 1 }}>
            {Object.keys(EXAMPLES).map(example => (
              <Screen
                key={example}
                name={example}
                // @ts-ignore
                Component={EXAMPLES[example]}
                visible={this.state.example === example}
                onBack={() => {
                  this.setState({ example: 'Welcome' });
                }}
              />
            ))}
          </Canal>
          <View
            style={{
              height: 48,
              justifyContent: 'space-around',
              flexDirection: 'row',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: 'white',
            }}
          >
            {Object.keys(EXAMPLES).map(example => (
              <TouchableOpacity
                key={example}
                onPress={() => {
                  // @ts-ignore
                  this.setState({ example });
                }}
                style={{
                  justifyContent: 'center',
                  borderTopWidth: 2,
                  paddingBottom: 2,
                  borderTopColor: this.state.example === example ? 'blue' : 'transparent',
                }}
              >
                <Text>{example}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </FullScreenPortal>
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, left: 0 }}
          onPress={Navigation.instance.back}
        >
          <View style={{ backgroundColor: 'black', borderBottomRightRadius: 4 }}>
            <Text style={{ color: 'white', margin: 4 }}>Go Back</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}
