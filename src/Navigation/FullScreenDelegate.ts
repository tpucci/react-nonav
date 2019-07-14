import { Subject, Observable } from 'rxjs';
import { mergeAll, map, scan } from 'rxjs/operators';
import { StopInterface } from './Stop';

type Stack = StopInterface[];

interface FullScreenStackProperties {
  canalId: string;
  fullScreenStack: Stack;
}

interface FullScreenStackMap {
  [canalId: string]: Stack;
}

export class FullScreenDelegate {
  canalsFullScreenStackProperties$ = new Subject<Observable<FullScreenStackProperties>>();

  fullSceenStack$: Observable<Stack> = this.canalsFullScreenStackProperties$.pipe(
    mergeAll(),
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
    )
  );
}
