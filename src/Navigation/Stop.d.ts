import { ComponentType } from 'react';

export interface IStop {
  name: string;
  Component: ComponentType;
  isFullScreen?: boolean;
}
