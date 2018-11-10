import { CommandResponse } from "../../../shared/command/CommandResponse";
import { CommandResponseStatus } from "../../../shared/command/CommandResponseStatus";
import { UuidIdentity } from "../../../shared/domain/UuidIdentity";
import { ITodoItemRepository } from "../../domain/ITodoItemRepository";
import { TodoItem } from "../../domain/TodoItem";
import { TodoItemDescriptionChangedEvent } from "../../domain/TodoItemDescriptionChangedEvent";
import { ChangeItemDescriptionCommand} from "../ChangeItemDescriptionCommand";
import { ChangeItemDescriptionCommandHandler } from "../ChangeItemDescriptionCommandHandler";

describe("ChangeItemDescriptionCommandHandler", () => {

  let mockTodoItemRepository: ITodoItemRepository;
  let handler: ChangeItemDescriptionCommandHandler;

  beforeEach(() => {
    const Mock = jest.fn<ITodoItemRepository>(() => ({
      get: jest.fn(),
    }));
    mockTodoItemRepository = new Mock();
    handler = new ChangeItemDescriptionCommandHandler(mockTodoItemRepository);
  });

  it("returns the item ID and a TodoItemDescriptionChangedEvent event", () => {
    const id = UuidIdentity.create();
    (mockTodoItemRepository.get as jest.Mock).mockReturnValue(new TodoItem(id));

    const response: CommandResponse = handler.handle(
      new ChangeItemDescriptionCommand(id.toString(), "This is a description"));
    expect(response.getStatus()).toEqual(CommandResponseStatus.ACK);
    expect(response.getValue() == null).toBeFalsy();
    expect(response.getValue()).toEqual(id.toString());
    expect(response.hasEvents()).toBeTruthy();
    expect(response.getEvents().length).toBe(1);
    expect(response.getEvents()[0] instanceof TodoItemDescriptionChangedEvent).toBeTruthy();
    expect((response.getEvents()[0] as TodoItemDescriptionChangedEvent).getId().equals(id)).toBeTruthy();
    expect((response.getEvents()[0] as TodoItemDescriptionChangedEvent)
      .getDescription()).toEqual("This is a description");
  });

  it("returns a NAK if the ID is unknown", () => {
    const longDesc: string = "a".repeat(101);
    const id = UuidIdentity.create();
    (mockTodoItemRepository.get as jest.Mock).mockReturnValue(null);

    const response: CommandResponse = handler.handle(
      new ChangeItemDescriptionCommand(id.toString(), longDesc));
    expect(response.getStatus()).toEqual(CommandResponseStatus.NAK);
    expect(response.getValue() == null).toBeFalsy();
    expect(typeof response.getValue()).toEqual("string");
    expect(response.hasEvents()).toBeFalsy();
  });

  it("returns a NAK if the description is too long", () => {
    const longDesc: string = "a".repeat(101);
    const id = UuidIdentity.create();
    (mockTodoItemRepository.get as jest.Mock).mockReturnValue(new TodoItem(id));

    const response: CommandResponse = handler.handle(
      new ChangeItemDescriptionCommand(id.toString(), longDesc));
    expect(response.getStatus()).toEqual(CommandResponseStatus.NAK);
    expect(response.getValue() == null).toBeFalsy();
    expect(typeof response.getValue()).toEqual("string");
    expect(response.hasEvents()).toBeFalsy();
  });

});
