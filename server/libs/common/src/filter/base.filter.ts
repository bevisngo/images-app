export class BaseFilter {
  public limit: 10;
  public skip: 0;

  constructor({ skip, limit }) {
    this.skip = skip;
    this.limit = limit;
  }
}
