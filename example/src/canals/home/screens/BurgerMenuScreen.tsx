import React from 'react';
import {Text, TouchableOpacity, SafeAreaView} from 'react-native';

export const BurgerMenuScreen = () => (
  <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
    <TouchableOpacity>
      <Text>Téléchargements</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
