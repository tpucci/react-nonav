import { BackHandler } from 'react-native';

export class BackHandlerDelegate {
  constructor() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  }

  private backHandler = () => {
    // tslint:disable-next-line
    console.log("Back action fired !");
  };
}
