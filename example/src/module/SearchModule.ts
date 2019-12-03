import {observable} from 'mobx';

class SearchModule_ {
  @observable
  isSearching = false;

  search = () => {
    this.isSearching = true;
  };

  cancel = () => {
    this.isSearching = false;
  };
}

export const SearchModule = new SearchModule_();
