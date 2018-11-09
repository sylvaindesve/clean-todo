import { IEventStore } from "../../ports/IEventStore";
import { ICommand } from "../command/ICommand";
import { ICommandBusMiddleware } from "../command/ICommandBusMiddleware";
import { ICommandResponse } from "../command/ICommandResponse";

export class EventDispatcher implements ICommandBusMiddleware {

  private _eventStore: IEventStore;

  constructor(eventStore: IEventStore) {
    this._eventStore = eventStore;
  }

  public dispatch(command: ICommand, nextMiddleware?: ICommandBusMiddleware): ICommandResponse {
    const response = nextMiddleware!.dispatch(command);

    if (response.hasEvents()) {
      this._eventStore.store(response.getEvents());
    }

    return response;
  }

}
