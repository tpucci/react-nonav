import { createContext } from 'react';
import { Observable } from 'rxjs';
import { IBackEvent } from './BackHandlerDelegate';
import { Navigation } from './Navigation';

interface IBackContext {
  back$: Observable<IBackEvent>;
}

export const BackContext = createContext<IBackContext>(
  Navigation.instance.backHandlerDelegate.defaultBackContext
);
