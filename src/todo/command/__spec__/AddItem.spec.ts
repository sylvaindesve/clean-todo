import { AddItem } from "../AddItem";

describe("AddItem command", () => {
  it("has a description", () => {
    const command: AddItem = new AddItem("This is a description");
    expect(command.description).toEqual("This is a description");
  });
});
