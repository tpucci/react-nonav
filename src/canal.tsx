import { ComponentType } from 'react';

export interface IStop {
  Component: ComponentType;
  name: string;
}

export class Canal {
  id: number = Date.now();
  stopsList: IStop[] = [];
  constructor(PagesList: ComponentType[]) {
    this.stopsList = PagesList.map(Page => ({
      Component: Page,
      name: Page.displayName || 'UntitledPage',
    }));
  }
}
