import { Component, ComponentType } from 'react';

export interface ITransition {}

export interface ITransitionComponentProps {
  directionForward: boolean;
}

export class TransitionComponent<P = {}, S = {}> extends Component<
  P & ITransitionComponentProps,
  S
> {}

export type TransitionComponentType<P = {}> = ComponentType<
  P & ITransitionComponentProps
>;
