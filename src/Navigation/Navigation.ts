import { FullScreenDelegate } from './FullScreenDelegate';

export class Navigation {
  static getInstance() {
    if (Navigation.instance) {
      return Navigation.instance;
    }
    Navigation.instance = new Navigation();
    return Navigation.instance;
  }
  private static instance: Navigation;

  fullScreenDelegate = new FullScreenDelegate();
}
