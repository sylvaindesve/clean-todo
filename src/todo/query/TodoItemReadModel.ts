import { IReadModel } from "../../shared/query/IReadModel";

export class TodoItemReadModel implements IReadModel {
  constructor(
    public readonly id: string,
    public readonly description: string,
  ) {}
}
