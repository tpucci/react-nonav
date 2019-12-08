import {observable, autorun} from 'mobx';
import NetInfo from '@react-native-community/netinfo';

class ConnectivityModule_ {
  constructor() {
    NetInfo.addEventListener(state => {
      this.isConnected = state.isConnected;
    });

    autorun(() => {
      console.log('[ConnectivityModule]', 'isConnected', this.isConnected);
    });
  }

  @observable
  isConnected = true;

  @observable
  isConnectedToChromeCast = false;
}

export const ConnectivityModule = new ConnectivityModule_();
