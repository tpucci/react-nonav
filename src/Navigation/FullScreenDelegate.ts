import { Subject, Observable } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { ReactElement } from 'react';
import { ScreenProps, Screen } from '../Screen';

type Stack = ReactElement<ScreenProps, typeof Screen>[];

interface FullScreenStackProperties {
  canalId: string;
  fullScreenStack: Stack;
}

interface FullScreenStackMap {
  [canalId: string]: Stack;
}

export class FullScreenDelegate {
  canalsFullScreenStackProperties$ = new Subject<FullScreenStackProperties>();

  fullSceenStack$: Observable<Stack> = this.canalsFullScreenStackProperties$.pipe(
    scan(
      (
        fullScreenStackMap: FullScreenStackMap,
        fullScreenStackProperties: FullScreenStackProperties
      ) => ({
        ...fullScreenStackMap,
        [fullScreenStackProperties.canalId]: fullScreenStackProperties.fullScreenStack,
      }),
      {}
    ),
    map((fullScreenStackMap: FullScreenStackMap) =>
      Object.keys(fullScreenStackMap).reduce(
        (fullScreenStack: Stack, canalId: string) =>
          fullScreenStack.concat(fullScreenStackMap[canalId]),
        []
      )
    ),
    tap(o => console.warn(o))
  );
}
