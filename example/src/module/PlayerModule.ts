import {observable, computed, autorun} from 'mobx';

class PlayerModule_ {
  @observable
  movie: any | null = null;

  @observable
  isPlayerMinimized = false;

  @computed
  get isMoviePlaying() {
    return !!this.movie;
  }

  toggleIsPlayerMinimized = () => {
    this.isPlayerMinimized = !this.isPlayerMinimized;
  };

  playMovie = (movie: any) => {
    this.movie = movie;
  };

  stopMovie = () => {
    this.movie = null;
  };

  automaticallyMaximizePlayerOnMoviePlay = autorun(() => {
    if (this.movie) {
      this.isPlayerMinimized = false;
    }
  });
}

export const PlayerModule = new PlayerModule_();
