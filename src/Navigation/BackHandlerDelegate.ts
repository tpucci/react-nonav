import { BackHandler } from 'react-native';
import { fromEventPattern } from 'rxjs';
import { map, elementAt } from 'rxjs/operators';

export class BackHandlerDelegate {
  private shouldExit: boolean = false;
  constructor() {
    const addHandler = (handler: () => void) => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        handler();
        return !this.shouldExit;
      });
    };
    const hardwareBacks$ = fromEventPattern<undefined>(addHandler);
    hardwareBacks$
      .pipe(map(this.resetShouldExit))
      .pipe(
        map(() => {
          // tslint:disable-next-line
          console.log("back");
        })
      )
      .pipe(elementAt(3))
      .subscribe(this.setShouldExit);
  }
  private resetShouldExit = () => {
    this.shouldExit = false;
  };
  private setShouldExit = () => {
    this.shouldExit = true;
  };
}
