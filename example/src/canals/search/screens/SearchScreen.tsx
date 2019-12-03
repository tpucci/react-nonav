import React from 'react';
import {View, SafeAreaView, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {SearchModule} from '../../../module/SearchModule';

export const SearchScreen = () => (
  <View style={{backgroundColor: '#000000', flex: 1}}>
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={SearchModule.cancel} style={{margin: 10}}>
          <Icon name="close" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: '#222222',
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginRight: 10,
            borderRadius: 15,
            color: '#FFFFFF',
          }}
          placeholder="Rechercher"
          placeholderTextColor="#CCCCCC"
          autoFocus
        />
      </View>
    </SafeAreaView>
  </View>
);
