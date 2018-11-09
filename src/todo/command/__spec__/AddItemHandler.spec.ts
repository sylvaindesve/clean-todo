import { CommandResponse } from "../../../shared/command/CommandResponse";
import { TodoItemAdded } from "../../domain/TodoItemAdded";
import { AddItem } from "../AddItem";
import { AddItemHandler } from "../AddItemHandler";

describe("AddItemHandler", () => {

  it("returns the new item ID and a TodoItemAdded event", () => {
    const handler = new AddItemHandler();
    const response: CommandResponse = handler.handle(new AddItem("This is a test"));
    expect(response.getValue() == null).toBeFalsy();
    expect(response.hasEvents()).toBeTruthy();
    expect(response.getEvents().length).toBe(1);
    expect(response.getEvents()[0] instanceof TodoItemAdded).toBeTruthy();
  });

});
