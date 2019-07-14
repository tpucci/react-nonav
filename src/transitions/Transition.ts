import { Component, ComponentType } from 'react';

export interface TransitionComponentProps {
  directionForward: boolean;
}

export class TransitionComponent<P = {}, S = {}> extends Component<
  P & TransitionComponentProps,
  S
> {}

export type TransitionComponentType<P = {}> = ComponentType<P & TransitionComponentProps>;
