import { FullScreenDelegate } from './FullScreenDelegate';

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
}
