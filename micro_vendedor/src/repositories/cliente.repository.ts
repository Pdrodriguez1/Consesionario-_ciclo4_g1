import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Mysql2DataSource} from '../datasources';
import {Cliente, ClienteRelations, Vendedor} from '../models';
import {VendedorRepository} from './vendedor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly pertenece_a_vendedor: BelongsToAccessor<Vendedor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql2') dataSource: Mysql2DataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Cliente, dataSource);
    this.pertenece_a_vendedor = this.createBelongsToAccessorFor('pertenece_a_vendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a_vendedor', this.pertenece_a_vendedor.inclusionResolver);
  }
}
