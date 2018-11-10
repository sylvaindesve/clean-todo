import { ChangeItemDescription } from "../ChangeItemDescription";

describe("ChangeItemDescription command", () => {
  it("has an id and a description", () => {
    const command: ChangeItemDescription =
      new ChangeItemDescription("Some ID", "This is a description");
    expect(command.id).toEqual("Some ID");
    expect(command.description).toEqual("This is a description");
  });
});
