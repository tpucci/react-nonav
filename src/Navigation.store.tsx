import { observable } from 'mobx';
import { Canal } from 'Canal';

interface INavigationState {}
interface ICanalsMap {
  [key: string]: Canal;
}

export class Navigation {
  static getInstance() {
    if (Navigation.instance) {
      return Navigation.instance;
    }
    Navigation.instance = new Navigation();
    return Navigation.instance;
  }
  private static instance: Navigation;

  private canalsMap: ICanalsMap = {};

  @observable
  private state: INavigationState = {};
}
