import { DataSource, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  private _target: any;

  constructor(
    target: any,
    private _baseDataSource: DataSource,
  ) {
    super(target, _baseDataSource.createEntityManager());
    this._target = target;
  }
}
