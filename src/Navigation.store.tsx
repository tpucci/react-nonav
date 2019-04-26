import { observable } from 'mobx';
import { Subject } from 'rxjs';
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

  canalsSubject = new Subject<Canal>();

  // @ts-ignore
  private canalsMapSubscription = this.canalsSubject.subscribe({
    next: (canal: Canal) => {
      this.canalsMap[canal.id] = canal;
    },
  });

  private canalsMap: ICanalsMap = {};

  @observable
  // @ts-ignore
  private state: INavigationState = {};
}
