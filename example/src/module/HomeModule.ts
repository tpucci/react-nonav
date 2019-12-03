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
}

export const HomeModule = new HomeModule_();
