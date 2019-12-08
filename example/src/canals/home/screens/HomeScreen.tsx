import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {observer} from 'mobx-react';
import {Header} from '../../../atoms/Header';
import {MovieCard} from '../../../atoms/MovieCard';
import {MoviesModule} from '../../../module/MoviesModule';
import {HomeModule} from '../../../module/HomeModule';
import {SearchModule} from '../../../module/SearchModule';
import {PlayerModule} from '../../../module/PlayerModule';

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
  {
    title: 'Découvrir',
    dataFilter: movie => movie.progress === 0,
  },
];

export const HomeScreen = observer(() => {
  const headerMovie = MoviesModule.movies.filter(
    movie => movie.available && !movie.myList,
  )[0];
  return (
    <View>
      <FlatList
        contentContainerStyle={{paddingBottom: 60}}
        ListHeaderComponent={
          <View style={{position: 'relative'}}>
            <Header
              onPress={() => PlayerModule.playMovie(headerMovie)}
              title={headerMovie.title}
              subtitle="Nouveaux épisodes disponibles"
              imageUri={headerMovie.imageUri}
            />
            <SafeAreaView style={{position: 'absolute', width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10,
                }}>
                <TouchableOpacity onPress={HomeModule.openBurgerMenu}>
                  <Icon name="menu" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={SearchModule.search}>
                  <Icon name="magnifier" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
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
                renderItem={({item}) => <MovieCard movie={item} />}
              />
            </>
          );
        }}
      />
    </View>
  );
});
