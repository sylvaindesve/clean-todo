import { ICommand } from "../command/ICommand";
import { ICommandBusMiddleware } from "../command/ICommandBusMiddleware";
import { ICommandResponse } from "../command/ICommandResponse";
import { IEventBus } from "./IEventBus";
import { IEventStore } from "./IEventStore";

export class EventDispatcher implements ICommandBusMiddleware {

  private _eventStore: IEventStore;
  private _eventBus: IEventBus;

  constructor(eventStore: IEventStore, eventBus: IEventBus) {
    this._eventStore = eventStore;
    this._eventBus = eventBus;
  }

  public dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse {
    const response = nextMiddleware!.dispatch(command);

    if (response.hasEvents()) {
      this._eventStore.store(response.getEvents());
      this._eventBus.publish(response.getEvents());
    }

    return response;
  }

}
