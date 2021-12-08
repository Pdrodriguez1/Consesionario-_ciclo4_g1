import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Mysql3DataSource} from '../datasources';
import {Factura, FacturaRelations, Venta} from '../models';
import {VentaRepository} from './venta.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly pertenece_a_venta: BelongsToAccessor<Venta, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysql3') dataSource: Mysql3DataSource, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Factura, dataSource);
    this.pertenece_a_venta = this.createBelongsToAccessorFor('pertenece_a_venta', ventaRepositoryGetter,);
    this.registerInclusionResolver('pertenece_a_venta', this.pertenece_a_venta.inclusionResolver);
  }
}
