import { observable, computed, action } from 'mobx';
import { Subject } from 'rxjs';
import { Canal, IStop } from './Canal';

interface INavigationEvent {
  canalId: Canal['id'];
  stop: IStop;
}
interface INavigationState {
  [key: string]: IStop[];
}
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
      this.pushToHistory(canal, canal.stopsList[0]);
    },
  });

  private canalsMap: ICanalsMap = {};

  @observable
  private history: INavigationEvent[] = [];

  @action
  private pushToHistory = (canal: Canal, stop: IStop) => {
    this.history.push({
      canalId: canal.id,
      stop,
    });
  };

  @computed get state(): INavigationState {
    const result = this.history.reduce(
      (previousState, navigationEvent) => ({
        ...previousState,
        [navigationEvent.canalId]: [navigationEvent.stop],
      }),
      {}
    );
    return result;
  }
}
