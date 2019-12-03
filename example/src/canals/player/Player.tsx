import React from 'react';
import {Canal, Screen} from 'react-nonav';
import {StyleSheet, View} from 'react-native';
import {PlayerCanal} from './PlayerCanal';
import {observer} from 'mobx-react';
import {PlayerTransitioner} from './transitions/PlayerTransitioner';
import {PlayerModule} from '../../module/PlayerModule';

export const Player = observer(() => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Canal style={{flex: 1}}>
        <Screen
          name="PlayerCanal"
          visible={!PlayerModule.isPlayerMinimized}
          Component={PlayerCanal}
          Transitioner={PlayerTransitioner}
        />
      </Canal>
    </View>
  );
});
