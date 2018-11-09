// tslint:disable:max-classes-per-file
import { ClassUtil } from "../../ClassUtil";
import { CommandHandlerDispatcher } from "../CommandHandlerDispatcher";
import { CommandResponse } from "../CommandResponse";
import { ICommand } from "../ICommand";
import { ICommandHandler } from "../ICommandHandler";
import { ICommandResponse } from "../ICommandResponse";

class TestCommand implements ICommand {}
class TestCommand2 implements ICommand {}

class TestCommandHandler implements ICommandHandler {
  public handle(command: ICommand): ICommandResponse {
    return new CommandResponse("OK", []);
  }
  public listenTo(): string { return ClassUtil.nameOf(TestCommand); }
}

describe("CommandHandlerDispatcher", () => {

  it("apply registered command handler", () => {
    const dispatcher = new CommandHandlerDispatcher();
    dispatcher.registerHandler(new TestCommandHandler());
    const response = dispatcher.dispatch(new TestCommand());
    expect((response as CommandResponse).value).toBe("OK");
  });

  it("throws error if it does not have the right command handler", () => {
    const dispatcher = new CommandHandlerDispatcher();
    dispatcher.registerHandler(new TestCommandHandler());
    expect(() => {
      dispatcher.dispatch(new TestCommand2());
    }).toThrow();
  });

});
