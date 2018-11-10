import { CommandResponse } from "../../../shared/command/CommandResponse";
import { TodoItemAdded } from "../../domain/TodoItemAdded";
import { AddItemCommand } from "../AddItemCommand";
import { AddItemCommandHandler } from "../AddItemCommandHandler";

describe("AddItemCommandHandler", () => {

  it("returns the new item ID and a TodoItemAdded event", () => {
    const handler = new AddItemCommandHandler();
    const response: CommandResponse = handler.handle(new AddItemCommand("This is a description"));
    expect(response.getValue() == null).toBeFalsy();
    expect(response.hasEvents()).toBeTruthy();
    expect(response.getEvents().length).toBe(1);
    expect(response.getEvents()[0] instanceof TodoItemAdded).toBeTruthy();
    expect((response.getEvents()[0] as TodoItemAdded).getDescription()).toEqual("This is a description");
  });

});
