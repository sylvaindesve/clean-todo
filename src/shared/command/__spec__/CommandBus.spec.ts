// tslint:disable:max-classes-per-file
import { CommandBus } from "../CommandBus";
import { CommandResponse } from "../CommandResponse";
import { ICommand } from "../ICommand";
import { ICommandBusMiddleware } from "../ICommandBusMiddleware";
import { ICommandResponse } from "../ICommandResponse";

class MiddleWare1 implements ICommandBusMiddleware {
  public dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse {
    const response = nextMiddleware!.dispatch(command);
    return CommandResponse.withValue(response.getValue() + " went through 1");
  }
}

class MiddleWare2 implements ICommandBusMiddleware {
  public dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse {
    const response = nextMiddleware!.dispatch(command);
    return CommandResponse.withValue(response.getValue() + " went through 2");
  }
}

class LastMiddleWare implements ICommandBusMiddleware {
  public dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse {
    return CommandResponse.withValue("OK");
  }
}

describe("CommandBus", () => {

  it("applies chain of middlewares", () => {
    const bus = new CommandBus([new MiddleWare1(), new MiddleWare2(), new LastMiddleWare()]);
    const response = bus.handle({});
    expect(response.getValue()).toBe("OK went through 2 went through 1");
  });

});
