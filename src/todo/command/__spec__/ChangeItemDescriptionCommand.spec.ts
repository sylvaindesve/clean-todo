import { ChangeItemDescriptionCommand } from "../ChangeItemDescriptionCommand";

describe("ChangeItemDescriptionCommand command", () => {
  it("has an id and a description", () => {
    const command: ChangeItemDescriptionCommand =
      new ChangeItemDescriptionCommand("Some ID", "This is a description");
    expect(command.id).toEqual("Some ID");
    expect(command.description).toEqual("This is a description");
  });
});
