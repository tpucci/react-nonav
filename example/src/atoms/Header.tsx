import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export const Header = (props: {
  onPress: () => unknown;
  title: string;
  subtitle: string;
  imageUri: string;
}) => (
  <View style={{height: 250, paddingBottom: 10}}>
    <Image
      style={StyleSheet.absoluteFill}
      source={{
        uri: props.imageUri,
        priority: Image.priority.normal,
      }}
      resizeMode={Image.resizeMode.cover}
    />
    <LinearGradient
      colors={['#00000088', '#00000000']}
      style={{
        ...StyleSheet.absoluteFill,
        height: 25,
      }}
    />
    <LinearGradient
      colors={['#11111100', '#111111']}
      style={{
        ...StyleSheet.absoluteFill,
        justifyContent: 'flex-end',
        paddingVertical: 15,
      }}>
      <Text
        style={{
          fontSize: 24,
          textAlign: 'center',
          fontWeight: '500',
          color: '#FFFFFF',
        }}>
        {props.title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          textAlign: 'center',
          fontWeight: '500',
          color: '#FFFFFF',
        }}>
        {props.subtitle}
      </Text>
      <TouchableHighlight
        style={{
          alignSelf: 'center',
          marginTop: 15,
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
        }}
        underlayColor="#DDDDDD"
        onPress={props.onPress}>
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            fontWeight: '500',
            color: '#000000',
          }}>
          Regarder
        </Text>
      </TouchableHighlight>
    </LinearGradient>
  </View>
);
