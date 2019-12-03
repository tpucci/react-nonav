import React from 'react';
import {StyleSheet, StatusBar, Text} from 'react-native';
import {FullScreenPortal, Canal, Screen, transition} from 'react-nonav';
import {Home} from './canals/home/Home';
import {Player} from './canals/player/Player';
import {observer} from 'mobx-react';
import {PlayerModule} from './module/PlayerModule';

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#111111',
    flex: 1,
  },
});

console.disableYellowBox = true;

export const App = observer(() => (
  <>
    <StatusBar barStyle="light-content" />
    <Canal style={styles.appContainer}>
      <Screen name="Home" Component={Home} visible />
      <Screen
        name="Player"
        Transitioner={transition.SlideLeft}
        Component={Player}
        visible={PlayerModule.isMoviePlaying}
      />
    </Canal>
  </>
));
