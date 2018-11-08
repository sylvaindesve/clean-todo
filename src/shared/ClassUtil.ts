// from https://gitlab.com/epinxteren/ts-eventsourcing
export class ClassUtil {

  public static nameOf(instanceOrConstructor: any): string {
    if (typeof instanceOrConstructor === "function") {
      return this.nameOfConstructor(instanceOrConstructor);
    }
    return this.nameOfInstance(instanceOrConstructor);
  }

  public static nameOfInstance(instance: any): string {
    return this.nameOfConstructor(Object.getPrototypeOf(instance).constructor);
  }

  public static nameOfConstructor(constructor: new (...args: any[]) => any): string {
    return constructor.name as string;
  }

  public static constructorIsInstanceOf(constructor: new (...args: any[]) => any, base: new (...args: any[]) => any) {
    return constructor === base || typeof constructor === "function" && (constructor.prototype instanceof base);
  }

}
