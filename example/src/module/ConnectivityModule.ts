import {observable, autorun} from 'mobx';
import NetInfo from '@react-native-community/netinfo';

class ConnectivityModule_ {
  constructor() {}

  @observable
  isConnected = true;
}

export const ConnectivityModule = new ConnectivityModule_();
