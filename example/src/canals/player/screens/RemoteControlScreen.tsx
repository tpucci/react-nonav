import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {View, TouchableOpacity} from 'react-native';
import {PlayerModule} from '../../../module/PlayerModule';

export const RemoteControlScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
    <TouchableOpacity onPress={PlayerModule.stopMovie}>
      <Icon name="control-pause" size={24} color="#FFFFFF" />
    </TouchableOpacity>
    <Icon name="control-play" size={24} color="#FFFFFF" />
    <Icon name="control-end" size={24} color="#FFFFFF" />
  </View>
);
