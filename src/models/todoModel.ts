export class TodoModel {
  id?: string;

  constructor(
    public name: string,
    public description: string,
    public completed: boolean,
    public _id?: string
  ) {
    this.id = _id;
  }
}

export interface ITodo {
  name: string;
  description: string;
  completed: boolean;
  _id?: string;
}
