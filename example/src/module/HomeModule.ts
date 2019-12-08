import {observable, autorun} from 'mobx';
import {ConnectivityModule} from './ConnectivityModule';

class HomeModule_ {
  automatilcallyFilterDownloads = autorun(() => {
    if (!ConnectivityModule.isConnected) {
      this.filterDownloaded();
    }
  });

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
