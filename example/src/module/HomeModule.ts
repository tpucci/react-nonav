import {observable} from 'mobx';

class HomeModule_ {
  @observable
  isFilteringDownloaded = false;

  filterDownloaded = () => {
    this.isFilteringDownloaded = true;
  };

  cancelFilter = () => {
    this.isFilteringDownloaded = false;
  };

  @observable
  isBurgerMenuOpen = false;

  openBurgerMenu = () => {
    this.isBurgerMenuOpen = true;
  };

  closeBurgerMenu = () => {
    this.isBurgerMenuOpen = false;
  };
}

export const HomeModule = new HomeModule_();
