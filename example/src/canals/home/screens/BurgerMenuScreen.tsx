import React from 'react';
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {Navigation} from 'react-nonav';
import {HomeModule} from '../../../module/HomeModule';

export const BurgerMenuScreen = () => (
  <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
    {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
    <TouchableOpacity
      style={{paddingLeft: 10}}
      onPress={() => {
        Navigation.instance.back();
        HomeModule.filterDownloaded();
      }}>
      <Text style={{padding: 10, fontSize: 16}}>Téléchargements</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
