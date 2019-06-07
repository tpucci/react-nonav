import { Subject, Observable } from 'rxjs';
import { mergeAll, map, scan } from 'rxjs/operators';
import { IStop } from './Stop';

type Stack = IStop[];

interface IFullScreenStackProperties {
  canalId: string;
  fullScreenStack: Stack;
}

interface IFullScreenStackMap {
  [canalId: string]: Stack;
}

export class FullScreenDelegate {
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
    map((fullScreenStackMap: IFullScreenStackMap) =>
      Object.keys(fullScreenStackMap).reduce(
        (fullScreenStack: Stack, canalId: string) =>
          fullScreenStack.concat(fullScreenStackMap[canalId]),
        []
      )
    )
  );
}
