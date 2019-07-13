import { ComponentType } from 'react';

export interface IStop {
  Component: ComponentType<IStopComponentProps>;
  isFullScreen?: boolean;
  name: string;
  isAuthorized: boolean;
}

export interface IStopComponentProps {
  isAuthorized: boolean;
}
