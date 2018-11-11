// tslint:disable:max-classes-per-file
import { ClassUtil } from "../../ClassUtil";
import { IQuery } from "../IQuery";
import { IQueryBusMiddleware } from "../IQueryBusMiddleware";
import { IQueryHandler } from "../IQueryHandler";
import { IReadModel } from "../IReadModel";
import { QueryHandlerDispatcher } from "../QueryHandlerDispatcher";

class TestReadModel implements IReadModel {
  constructor(public readonly value: string) {}
}

class TestQuery implements IQuery {}
class TestQuery2 implements IQuery {}

const testQueryHandler: IQueryHandler = Object.assign((query: IQuery) => {
  return new TestReadModel("OK");
}, {listenTo: ClassUtil.nameOf(TestQuery)});

describe("QueryHandlerDispatcher", () => {

  it("apply registered command handler", () => {
    const dispatcher = new QueryHandlerDispatcher();
    dispatcher.registerHandler(testQueryHandler);
    const response = dispatcher.dispatch(new TestQuery());
    expect((response as TestReadModel).value).toBe("OK");
  });

  it("throws error if it does not have the right command handler", () => {
    const dispatcher = new QueryHandlerDispatcher();
    dispatcher.registerHandler(testQueryHandler);
    expect(() => {
      dispatcher.dispatch(new TestQuery2());
    }).toThrow();
  });

});
