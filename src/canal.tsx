import { ComponentType } from 'react';

export interface IStop {
  component: ComponentType;
  name: string;
}

export class Canal {
  id: number = Date.now();
  stopsList: IStop[] = [];
  constructor(PagesList: ComponentType[]) {
    this.stopsList = PagesList.map(Page => ({
      component: Page,
      name: Page.displayName || 'UntitledPage',
    }));
  }
}
