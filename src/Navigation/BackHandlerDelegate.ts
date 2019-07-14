import { BackHandler } from 'react-native';
import { fromEventPattern, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export interface BackEvent {
  target: string | null;
}

export class BackHandlerDelegate {
  /**
   * Attach the given handler to the event source. When the source emits,
   * calls the handler. The handler is responsible to register a callback.
   * If it succeeded to register a callback, we call it.
   * If not, and no other react native back event listener has been registered
   * elsewhere, this listener returns false which might kill the app.
   * See https://facebook.github.io/react-native/docs/backhandler.html.
   * @param handler
   */
  private addEventListener = (handler: (event: BackEvent) => void) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      handler({
        target: null,
      });
      if (this.onBackCallback) {
        this.onBackCallback();
        this.onBackCallback = undefined;
        return true;
      }
      return false;
    });
  };

  private back$: Observable<BackEvent> = fromEventPattern<BackEvent>(this.addEventListener).pipe(
    share()
  );

  private onBackCallback?: () => any;
  setOnBackCallback = (cb: () => any) => {
    this.onBackCallback = cb;
  };

  defaultBackContext = { back$: this.back$ };
}
