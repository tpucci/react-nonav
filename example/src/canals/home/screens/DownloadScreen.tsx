import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {Header} from '../../../atoms/Header';
import {MovieCard} from '../../../atoms/MovieCard';

const data = [
  {
    title: 'Séries téléchargées',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
];

export const DownloadScreen = () => (
  <View>
    <FlatList
      contentContainerStyle={{paddingBottom: 60}}
      ListHeaderComponent={
        <Header
          onPress={() => {}}
          title="Brooklyn nine nine"
          subtitle="10 épisodes téléchargés"
        />
      }
      data={data}
      keyExtractor={item => item.title}
      renderItem={({item}) => (
        <>
          <Text
            style={{
              fontSize: 12,
              color: '#FFFFFF',
              fontWeight: '500',
              marginLeft: 15,
            }}>
            {item.title}
          </Text>
          <FlatList
            keyExtractor={item => item}
            data={item.data}
            style={{marginTop: 10, marginBottom: 5}}
            contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 10}}
            horizontal
            renderItem={({item}) => <MovieCard />}
          />
        </>
      )}
    />
  </View>
);
