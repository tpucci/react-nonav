import { ComponentType } from 'react';

export interface StopInterface {
  Component: ComponentType<StopComponentProps>;
  isFullScreen?: boolean;
  name: string;
  isAuthorized: boolean;
}

export interface StopComponentProps {
  isAuthorized: boolean;
}
