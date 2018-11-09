import { UuidIdentity } from "../../shared/domain/UuidIdentity";
import { TodoItem } from "./TodoItem";

// Secondary/Driven port
export interface ITodoItemRepository {
  get(id: UuidIdentity): TodoItem;
}
