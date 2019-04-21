import { observable } from 'mobx';
import { Canal } from 'Canal';

interface INavigationState {}
interface ICanalsMap {
  [key: string]: Canal;
}

export class Navigation {
  @observable
  state: INavigationState = {};
  canalsMap: ICanalsMap = {};
}
