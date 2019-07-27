import { FullScreenDelegate } from './FullScreenDelegate';
import { BackHandlerDelegate } from './BackHandlerDelegate';

export class Navigation {
  static get instance() {
    if (Navigation.singleton) {
      return Navigation.singleton;
    }
    Navigation.singleton = new Navigation();
    return Navigation.singleton;
  }

  private constructor() {}
  private static singleton: Navigation;

  backHandlerDelegate = new BackHandlerDelegate();

  fullScreenDelegate = new FullScreenDelegate();

  back = () => {
    this.backHandlerDelegate.back();
  };
}
