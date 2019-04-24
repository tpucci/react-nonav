import { createContext } from 'react';
import { Navigation } from './Navigation.store';

export const NavigationContext = createContext(new Navigation());
