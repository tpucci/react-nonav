import {observable, computed} from 'mobx';
import {ConnectivityModule} from './ConnectivityModule';

class MoviesModule_ {
  @observable
  baseMovies = [
    {
      title: 'The Good Place',
      imageUri:
        'https://image.tmdb.org/t/p/w370_and_h556_bestv2/eFV0O3u0CbVdhEYIozea4iZRn3O.jpg',
      episode: 'S1:E1',
      progress: 0,
      downloaded: false,
      myList: false,
    },
    {
      title: 'Suits',
      imageUri:
        'https://image.tmdb.org/t/p/w370_and_h556_bestv2/vQiryp6LioFxQThywxbC6TuoDjy.jpg',
      episode: 'S4:E8',
      progress: 0.2,
      downloaded: false,
      myList: false,
    },
    {
      title: 'How I Met Your Mother',
      imageUri:
        'https://image.tmdb.org/t/p/w1280/izncB6dCLV7LBQ5MsOPyMx9mUDa.jpg',
      episode: 'S1:E3',
      progress: 0.5,
      downloaded: true,
      myList: false,
    },
    {
      title: 'Limitless',
      imageUri:
        'https://image.tmdb.org/t/p/w370_and_h556_bestv2/bQfOFEeXxi51ijQrbQY9qvMtYhZ.jpg',
      episode: 'S2:E1',
      progress: 0.1,
      downloaded: true,
      myList: false,
    },
    {
      title: 'Brooklyn nine nine',
      imageUri:
        'https://image.tmdb.org/t/p/w1280/A3SymGlOHefSKbz1bCOz56moupS.jpg',
      episode: 'S4:E8',
      progress: 0.2,
      downloaded: true,
      myList: true,
    },
  ];

  @computed
  get movies() {
    return this.baseMovies.map(o => ({
      ...o,
      available: ConnectivityModule.isConnected || o.downloaded,
    }));
  }
}

export const MoviesModule = new MoviesModule_();
