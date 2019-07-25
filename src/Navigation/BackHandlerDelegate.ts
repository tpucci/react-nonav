import { BackHandler } from 'react-native';
import { fromEventPattern, Observable, Subject } from 'rxjs';
import { share, map, merge, tap } from 'rxjs/operators';

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
  private addEventListener = (handler: () => void) => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      handler();
      return true;
    });
  };

  private softwareBack$ = new Subject<undefined>();

  private back$: Observable<BackEvent> = fromEventPattern<undefined>(this.addEventListener).pipe(
    merge(this.softwareBack$),
    tap(() => {
      // After the event has spread, we fire onBacks callbacks.
      setTimeout(() => {
        if (this.onBackCallback) {
          this.onBackCallback();
          this.onBackCallback = undefined;
        } else {
          BackHandler.exitApp();
        }
      }, 0);
    }),
    map(() => ({
      target: null,
    })),
    share()
  );

  private onBackCallback?: () => any;
  setOnBackCallback = (cb: () => any) => {
    this.onBackCallback = cb;
  };

  back = () => {
    this.softwareBack$.next();
  };

  defaultBackContext = { back$: this.back$ };
}
