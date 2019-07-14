import { createContext } from 'react';
import { Observable } from 'rxjs';
import { BackEvent } from './BackHandlerDelegate';
import { Navigation } from './Navigation';

export interface BackContextInterface {
  back$: Observable<BackEvent>;
}

export const BackContext = createContext<BackContextInterface>(
  Navigation.instance.backHandlerDelegate.defaultBackContext
);
