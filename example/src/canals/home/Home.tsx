import React, {useState} from 'react';
import {Canal, Screen, transition} from 'react-nonav';
import {StyleSheet, View} from 'react-native';

import {TabBar} from '../../atoms/TabBar';

import {HomeScreen} from './screens/HomeScreen';
import {DownloadScreen} from './screens/DownloadScreen';
import {FadeTransitioner} from '../../atoms/FadeTransitioner';

export const Home = () => {
  const [navigationScreen, setNavigationState] = useState('Home');

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canal style={{flex: 1}}>
        <Screen
          name="Home"
          Component={HomeScreen}
          visible={navigationScreen === 'Home'}
          Transitioner={FadeTransitioner}
        />
        <Screen
          name="Downloads"
          Component={DownloadScreen}
          visible={navigationScreen === 'Downloads'}
          Transitioner={FadeTransitioner}
        />
      </Canal>
      <TabBar
        items={[
          {
            iconName: 'home',
            title: 'Accueil',
            selected: navigationScreen === 'Home',
            onPress: () => {
              setNavigationState('Home');
            },
          },
          {
            iconName: 'magnifier',
            title: 'Rechercher',
            selected: false,
            onPress: () => {},
          },
          {
            iconName: 'arrow-down-circle',
            title: 'Téléchargements',
            selected: navigationScreen === 'Downloads',
            onPress: () => {
              setNavigationState('Downloads');
            },
          },
        ]}
      />
    </View>
  );
};
