import { CommandResponse } from "../../../shared/command/CommandResponse";
import { UuidIdentity } from "../../../shared/domain/UuidIdentity";
import { ITodoItemRepository } from "../../domain/ITodoItemRepository";
import { TodoItem } from "../../domain/TodoItem";
import { TodoItemDescriptionChanged } from "../../domain/TodoItemDescriptionChanged";
import { ChangeItemDescriptionCommand} from "../ChangeItemDescriptionCommand";
import { ChangeItemDescriptionCommandHandler } from "../ChangeItemDescriptionCommandHandler";

describe("ChangeItemDescriptionCommandHandler", () => {

  it("returns the item ID and a TodoItemDescriptionChanged event", () => {
    const Mock = jest.fn<ITodoItemRepository>(() => ({
      get: jest.fn(),
    }));
    const mockTodoItemRepository = new Mock();
    const handler = new ChangeItemDescriptionCommandHandler(mockTodoItemRepository);

    const id = UuidIdentity.create();
    (mockTodoItemRepository.get as jest.Mock).mockReturnValue(new TodoItem(id));

    const response: CommandResponse = handler.handle(new ChangeItemDescriptionCommand(id.toString(), "This is a description"));
    expect(response.getValue() == null).toBeFalsy();
    expect(response.getValue()).toEqual(id.toString());
    expect(response.hasEvents()).toBeTruthy();
    expect(response.getEvents().length).toBe(1);
    expect(response.getEvents()[0] instanceof TodoItemDescriptionChanged).toBeTruthy();
    expect((response.getEvents()[0] as TodoItemDescriptionChanged).getId().equals(id)).toBeTruthy();
    expect((response.getEvents()[0] as TodoItemDescriptionChanged).getDescription()).toEqual("This is a description");
  });

});
