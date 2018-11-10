import { CommandResponse } from "../../../shared/command/CommandResponse";
import { TodoItemAddedEvent } from "../../domain/TodoItemAddedEvent";
import { AddItemCommand } from "../AddItemCommand";
import { AddItemCommandHandler } from "../AddItemCommandHandler";

describe("AddItemCommandHandler", () => {

  it("returns the new item ID and a TodoItemAddedEvent event", () => {
    const handler = new AddItemCommandHandler();
    const response: CommandResponse = handler.handle(new AddItemCommand("This is a description"));
    expect(response.getValue() == null).toBeFalsy();
    expect(response.hasEvents()).toBeTruthy();
    expect(response.getEvents().length).toBe(1);
    expect(response.getEvents()[0] instanceof TodoItemAddedEvent).toBeTruthy();
    expect((response.getEvents()[0] as TodoItemAddedEvent).getDescription()).toEqual("This is a description");
  });

});
