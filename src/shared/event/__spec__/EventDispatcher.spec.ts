import { CommandResponseStatus } from "../../command/CommandResponseStatus";
import { ICommandBusMiddleware } from "../../command/ICommandBusMiddleware";
import { EventDispatcher } from "../EventDispatcher";
import { IEventBus } from "../IEventBus";
import { IEventStore } from "../IEventStore";

describe("EventDispatcher", () => {

  const MockEventStore = jest.fn<IEventStore>(() => ({
    store: jest.fn(),
  }));
  const MockEventBus = jest.fn<IEventBus>(() => ({
    publish: jest.fn(),
    suscribe: jest.fn(),
  }));
  const MockCommandHandler = jest.fn<ICommandBusMiddleware>(() => ({
    dispatch: jest.fn(),
  }));

  let mockEventStore: IEventStore;
  let mockEventBus: IEventBus;
  let mockCommandHandler: ICommandBusMiddleware;
  let dispatcher: EventDispatcher;

  beforeEach(() => {
    mockEventStore = new MockEventStore();
    mockEventBus = new MockEventBus();
    mockCommandHandler = new MockCommandHandler();
    dispatcher = new EventDispatcher(mockEventStore, mockEventBus);

    (mockCommandHandler.dispatch as jest.Mock).mockReturnValue({
      getEvents: () => [1, 2, 3],
      getStatus: () => CommandResponseStatus.ACK,
      getValue: () => "",
      hasEvents: () => true,
    });
  });

  it("stores events", () => {
    dispatcher.dispatch({}, mockCommandHandler);
    expect(mockEventStore.store).toHaveBeenCalledTimes(1);
    expect(mockEventStore.store).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("publishes events", () => {
    dispatcher.dispatch({}, mockCommandHandler);
    expect(mockEventBus.publish).toHaveBeenCalledTimes(1);
    expect(mockEventBus.publish).toHaveBeenCalledWith([1, 2, 3]);
  });

});
