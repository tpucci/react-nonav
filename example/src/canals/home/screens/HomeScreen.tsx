import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {Header} from '../../../atoms/Header';
import {MovieCard} from '../../../atoms/MovieCard';
import {MoviesModule} from '../../../module/MoviesModule';

const data = [
  {
    title: 'Reprendre avec le profil de Thomas',
    dataFilter: movie => movie.progress > 0,
  },
  {
    title: 'Ma Liste',
    dataFilter: movie => movie.myList,
  },
  {
    title: 'Téléchargements',
    dataFilter: movie => movie.downloaded,
  },
];

export const HomeScreen = () => {
  const headerMovie = MoviesModule.movies.filter(
    movie => !movie.downloaded && !movie.myList,
  )[0];
  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingBottom: 60}}
        ListHeaderComponent={
          <Header
            onPress={() => {}}
            title={headerMovie.title}
            subtitle="Nouveaux épisodes disponibles"
            imageUri={headerMovie.imageUri}
          />
        }
        data={data}
        keyExtractor={item => item.title}
        renderItem={({item}) => {
          const sectionMovies = MoviesModule.movies.filter(item.dataFilter);
          return (
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
                keyExtractor={item => item.imageUri}
                data={sectionMovies}
                style={{marginTop: 10, marginBottom: 5}}
                contentContainerStyle={{
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}
                horizontal
                renderItem={({item}) => (
                  <MovieCard
                    imageUri={item.imageUri}
                    episode={item.episode}
                    progress={item.progress}
                  />
                )}
              />
            </>
          );
        }}
      />
    </View>
  );
};
