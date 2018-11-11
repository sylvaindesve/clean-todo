// tslint:disable:max-classes-per-file
import { IQuery } from "../IQuery";
import { IQueryBusMiddleware } from "../IQueryBusMiddleware";
import { IReadModel } from "../IReadModel";
import { QueryBus } from "../QueryBus";

class TestReadModel implements IReadModel {
  constructor(public value: string) {}
}

class QueryBusMiddleware1 implements IQueryBusMiddleware {
  public dispatch(query: IQuery, nextMiddleware?: IQueryBusMiddleware | undefined): IReadModel | Error {
    const readModel = nextMiddleware!.dispatch(query);
    return new TestReadModel((readModel as TestReadModel).value + " went through 1");
  }
}

class QueryBusMiddleware2 implements IQueryBusMiddleware {
  public dispatch(query: IQuery, nextMiddleware?: IQueryBusMiddleware | undefined): IReadModel | Error {
    const readModel = nextMiddleware!.dispatch(query);
    return new TestReadModel((readModel as TestReadModel).value + " went through 2");
  }
}

class LastQueryBusMiddleware implements IQueryBusMiddleware {
  public dispatch(query: IQuery, nextMiddleware?: IQueryBusMiddleware | undefined): IReadModel | Error {
    return new TestReadModel("Test");
  }
}

describe("QueryBus", () => {

  it("applies chain of middlewares", () => {
    const bus = new QueryBus([
      new QueryBusMiddleware1(),
      new QueryBusMiddleware2(),
      new LastQueryBusMiddleware(),
    ]);
    const model = bus.dispatch({});
    expect((model as TestReadModel).value).toEqual("Test went through 2 went through 1");
  });

});
