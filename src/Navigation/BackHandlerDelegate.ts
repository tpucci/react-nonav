import { BackHandler } from 'react-native';
import { fromEventPattern } from 'rxjs';

export interface IBackEvent {
  target: string | null;
}

export class BackHandlerDelegate {
  private static addEventListener = (handler: (event: IBackEvent) => void) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      handler({
        target: null
      });
      return true;
    });
  };

  private back$ = fromEventPattern<IBackEvent>(
    BackHandlerDelegate.addEventListener
  );

  defaultBackContext = { back$: this.back$ };
}
