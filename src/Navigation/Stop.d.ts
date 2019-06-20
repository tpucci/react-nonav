import { ComponentType } from 'react';

export interface IStop {
  Component: ComponentType;
  isFullScreen?: boolean;
  name: string;
}
