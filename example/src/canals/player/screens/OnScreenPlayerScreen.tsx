import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {View, TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';

import {PlayerModule} from '../../../module/PlayerModule';

export const OnScreenPlayerScreen = (props: {movie: any}) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
    }}>
    <View>
      <Image
        style={{height: 200}}
        source={{
          uri: props.movie.imageUri,
          priority: Image.priority.normal,
        }}
        resizeMode={Image.resizeMode.cover}
      />
      <View style={{backgroundColor: '#444444', height: 4, marginBottom: 10}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#e30612',
            width: `${props.movie.progress * 100}%`,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity onPress={PlayerModule.stopMovie}>
          <Icon name="control-pause" size={12} color="#FFFFFF" />
        </TouchableOpacity>
        <Icon name="control-play" size={12} color="#FFFFFF" />
        <Icon name="control-end" size={12} color="#FFFFFF" />
      </View>
    </View>
  </View>
);
