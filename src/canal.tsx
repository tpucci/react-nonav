export interface IStop {
  name: string;
}

export class Canal {
  id: number = Date.now();
  stopsList: IStop[] = [];
}
