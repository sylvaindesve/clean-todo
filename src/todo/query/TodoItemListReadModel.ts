import { IReadModel } from "../../shared/query/IReadModel";
import { TodoItemReadModel } from "./TodoItemReadModel";

export class TodoItemListReadModel implements IReadModel {
  constructor(
    public readonly items: TodoItemReadModel[],
  ) {}
}
