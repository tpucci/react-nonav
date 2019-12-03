import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

interface TabBarItemProps {
  iconName: string;
  title: string;
  selected: boolean;
  onPress: () => unknown;
}

const TabBarItem = (props: TabBarItemProps) => {
  const color = props.selected ? '#FFFFFF' : '#999999';
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        alignItems: 'center',
        paddingVertical: 8,
        justifyContent: 'center',
      }}>
      <Icon name={props.iconName} size={12} color={color} />
      <Text
        style={{
          fontSize: 8,
          fontWeight: '500',
          color,
          marginTop: 3,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export const TabBar = (props: {items: Array<TabBarItemProps>}) => (
  <View
    style={{
      backgroundColor: '#111111',
      flexDirection: 'row',
      justifyContent: 'space-around',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      height: 60,
    }}>
    {props.items.map(item => (
      <TabBarItem key={item.iconName} {...item} />
    ))}
  </View>
);
