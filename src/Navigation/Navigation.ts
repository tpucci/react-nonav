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
  private static singleton: Navigation;

  fullScreenDelegate = new FullScreenDelegate();

  backHandlerDelegate = new BackHandlerDelegate();

  private constructor() {}
}
