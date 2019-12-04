import React, {useState} from 'react';
import {Canal, Screen, transition} from 'react-nonav';
import {StyleSheet, View} from 'react-native';

import {TabBar} from '../../atoms/TabBar';

import {HomeScreen} from './screens/HomeScreen';
import {DownloadScreen} from './screens/DownloadScreen';
import {SearchModule} from '../../module/SearchModule';
import {HomeModule} from '../../module/HomeModule';
import {observer} from 'mobx-react';
import {BurgerMenuScreen} from './screens/BurgerMenuScreen';

export const Home = observer(() => (
  <View style={StyleSheet.absoluteFill}>
    <Canal style={{flex: 1}}>
      <Screen
        name="Home"
        Component={HomeScreen}
        visible={!HomeModule.isFilteringDownloaded}
        Transitioner={transition.Fade}
      />
      <Screen
        name="Downloads"
        Component={DownloadScreen}
        visible={HomeModule.isFilteringDownloaded}
        Transitioner={transition.Fade}
      />
      <Screen
        name="BurgerMenu"
        key="BurgerMenu"
        Component={BurgerMenuScreen}
        visible={HomeModule.isBurgerMenuOpen}
        Transitioner={transition.BurgerMenuLeft}
        isFullScreen
        onBack={HomeModule.closeBurgerMenu}
      />
    </Canal>
    <TabBar
      items={[
        {
          iconName: 'home',
          title: 'Accueil',
          selected: !HomeModule.isFilteringDownloaded,
          onPress: HomeModule.cancelFilter,
        },
        {
          iconName: 'magnifier',
          title: 'Rechercher',
          selected: false,
          onPress: SearchModule.search,
        },
        {
          iconName: 'arrow-down-circle',
          title: 'Téléchargements',
          selected: HomeModule.isFilteringDownloaded,
          onPress: HomeModule.filterDownloaded,
        },
      ]}
    />
  </View>
));
