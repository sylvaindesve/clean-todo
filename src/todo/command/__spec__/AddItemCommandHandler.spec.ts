import { CommandResponse } from "../../../shared/command/CommandResponse";
import { CommandResponseStatus } from "../../../shared/command/CommandResponseStatus";
import { TodoItemAddedEvent } from "../../domain/TodoItemAddedEvent";
import { AddItemCommand } from "../AddItemCommand";
import { AddItemCommandHandler } from "../AddItemCommandHandler";

describe("AddItemCommandHandler", () => {

  it("returns the new item ID and a TodoItemAddedEvent event", () => {
    const handler = new AddItemCommandHandler();
    const response: CommandResponse = handler.handle(new AddItemCommand("This is a description"));
    expect(response.getStatus()).toEqual(CommandResponseStatus.ACK);
    expect(response.getValue() == null).toBeFalsy();
    expect(response.hasEvents()).toBeTruthy();
    expect(response.getEvents().length).toBe(1);
    expect(response.getEvents()[0] instanceof TodoItemAddedEvent).toBeTruthy();
    expect((response.getEvents()[0] as TodoItemAddedEvent).getDescription()).toEqual("This is a description");
  });

  it("returns a NAK when description is too long", () => {
    const longDesc: string = "a".repeat(101);
    const handler = new AddItemCommandHandler();
    const response: CommandResponse = handler.handle(new AddItemCommand(longDesc));
    expect(response.getStatus()).toEqual(CommandResponseStatus.NAK);
    expect(response.getValue() == null).toBeFalsy();
    expect(typeof response.getValue()).toEqual("string");
    expect(response.hasEvents()).toBeFalsy();
  });

});
