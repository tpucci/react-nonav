import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PlayerModule} from '../module/PlayerModule';

export const MovieCard = (props: {
  imageUri: string;
  episode: string;
  progress: number;
}) => (
  <View
    style={{
      backgroundColor: '#111111',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      borderRadius: 10,
      marginHorizontal: 5,
    }}>
    <TouchableOpacity
      onPress={PlayerModule.playMovie}
      style={{
        height: 140,
        width: 100,
        borderRadius: 10,
        backgroundColor: 'red',
        overflow: 'hidden',
      }}>
      <Image
        style={StyleSheet.absoluteFill}
        source={{
          uri: props.imageUri,
          priority: Image.priority.normal,
        }}
        resizeMode={Image.resizeMode.cover}
      />
      <View
        style={{
          ...StyleSheet.absoluteFill,
          justifyContent: 'flex-end',
        }}>
        <LinearGradient colors={['#00000000', '#000000CC']}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#FFFFFF',
              marginLeft: 10,
              paddingVertical: 10,
            }}>
            {props.episode}
          </Text>
          <View style={{backgroundColor: '#444444', height: 4}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#e30612',
                width: `${props.progress * 100}%`,
              }}
            />
          </View>
        </LinearGradient>
      </View>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}>
          <Icon
            name="play"
            size={18}
            color="#000000"
            style={{paddingLeft: 4}}
          />
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
