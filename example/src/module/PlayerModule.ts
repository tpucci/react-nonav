import {observable, computed} from 'mobx';

class PlayerModule_ {
  @observable
  movie: string | null = null;

  @observable
  isPlayerMinimized = false;

  @computed
  get isMoviePlaying() {
    return !!this.movie;
  }

  toggleIsPlayerMinimized = () => {
    this.isPlayerMinimized = !this.isPlayerMinimized;
  };

  playMovie = () => {
    this.movie = 'a';
  };

  stopMovie = () => {
    this.movie = null;
  };
}

export const PlayerModule = new PlayerModule_();
