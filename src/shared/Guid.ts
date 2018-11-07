export class Guid {

  // tslint:disable-next-line:max-line-length
  public static guidRegExp: RegExp = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;

  public static newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:one-variable-per-declaration no-bitwise
      const r = Math.random() * 16 | 0, v = c === "x" ? r : ( r & 0x3 | 0x8 );
      return v.toString(16);
    });
  }

}
