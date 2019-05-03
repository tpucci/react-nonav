import { ComponentType } from 'react';

export interface IStop {
  Component: ComponentType;
  name: string;
}

export class Canal {
  id: number = Date.now();
  stopsList: IStop[] = [];
  constructor(StopsList: IStop[]) {
    this.stopsList = StopsList;
  }
}
