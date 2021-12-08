import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Mysql2DataSource} from '../datasources';
import {Vendedor, VendedorRelations, Cliente, UsuarioVendedor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {UsuarioVendedorRepository} from './usuario-vendedor.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Vendedor.prototype.id>;

  public readonly Tiene_solo_un: HasOneRepositoryFactory<UsuarioVendedor, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.mysql2') dataSource: Mysql2DataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('UsuarioVendedorRepository') protected usuarioVendedorRepositoryGetter: Getter<UsuarioVendedorRepository>,
  ) {
    super(Vendedor, dataSource);
    this.Tiene_solo_un = this.createHasOneRepositoryFactoryFor('Tiene_solo_un', usuarioVendedorRepositoryGetter);
    this.registerInclusionResolver('Tiene_solo_un', this.Tiene_solo_un.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
