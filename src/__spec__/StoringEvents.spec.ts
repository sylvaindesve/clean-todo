// tslint:disable:max-classes-per-file
import { ClassUtil } from "../shared/ClassUtil";
import { CommandBus } from "../shared/command/CommandBus";
import { CommandHandlerDispatcher } from "../shared/command/CommandHandlerDispatcher";
import { CommandResponse } from "../shared/command/CommandResponse";
import { ICommand } from "../shared/command/ICommand";
import { ICommandBusMiddleware } from "../shared/command/ICommandBusMiddleware";
import { ICommandHandler } from "../shared/command/ICommandHandler";
import { ICommandResponse } from "../shared/command/ICommandResponse";
import { IDomainEvent } from "../shared/domain/IDomainEvent";
import { EventDispatcher } from "../shared/event/EventDispatcher";
import { IEventStore } from "../shared/event/IEventStore";

class TestCommand implements ICommand {}

class TestEvent implements IDomainEvent {
  private _id: string;
  constructor(id: string) { this._id = id; }
  public getId() {
    return {
      equals: () => true,
      toString: () => this._id,
    };
  }
}

class TestCommandHandler implements ICommandHandler {
  public handle(command: ICommand): ICommandResponse {
    return CommandResponse.ack("OK", [
      new TestEvent("test 1"),
      new TestEvent("test 2"),
    ]);
  }
  public listenTo(): string {
    return ClassUtil.nameOf(TestCommand);
  }
}

class InMemoryEventStore implements IEventStore {
  public storedEvent: IDomainEvent[];
  constructor() { this.storedEvent = []; }
  public store(events: IDomainEvent[]): void {
    events.forEach((e) => { this.storedEvent.push(e); });
  }
}

describe("Storing events along the way", () => {

  it("stores events", () => {
    const commandDispatcher = new CommandHandlerDispatcher();
    commandDispatcher.registerHandler(new TestCommandHandler());

    const eventStore = new InMemoryEventStore();

    const bus = new CommandBus([
      new EventDispatcher(eventStore),
      commandDispatcher,
    ]);

    bus.handle(new TestCommand());
    expect(eventStore.storedEvent.length).toBe(2);
    expect(eventStore.storedEvent[0].getId().toString()).toEqual("test 1");
  });

});
