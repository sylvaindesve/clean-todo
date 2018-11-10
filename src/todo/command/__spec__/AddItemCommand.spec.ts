import { AddItemCommand } from "../AddItemCommand";

describe("AddItemCommand command", () => {
  it("has a description", () => {
    const command: AddItemCommand = new AddItemCommand("This is a description");
    expect(command.description).toEqual("This is a description");
  });
});
