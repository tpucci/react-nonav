import { Subject, Observable } from 'rxjs';
import { ComponentType } from 'react';
import { mergeAll, map, scan } from 'rxjs/operators';

export interface IStop {
  name: string;
  Component: ComponentType;
  isFullScreen?: boolean;
}

type Stack = IStop[];

interface IFullScreenStackProperties {
  canalId: string;
  fullScreenStack: Stack;
}

interface IFullScreenStackMap {
  [canalId: string]: Stack;
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

  canalsFullScreenStackProperties$ = new Subject<
    Observable<IFullScreenStackProperties>
  >();

  fullSceenStack$: Observable<
    Stack
  > = this.canalsFullScreenStackProperties$.pipe(
    mergeAll(),
    scan(
      (
        fullScreenStackMap: IFullScreenStackMap,
        fullScreenStackProperties: IFullScreenStackProperties
      ) => ({
        ...fullScreenStackMap,
        [fullScreenStackProperties.canalId]:
          fullScreenStackProperties.fullScreenStack
      }),
      {}
    ),
    map(fullScreenStackMap =>
      Object.keys(fullScreenStackMap).reduce(
        (fullScreenStack: Stack, canalId: string) =>
          fullScreenStack.concat(fullScreenStackMap[canalId]),
        []
      )
    )
  );
}
