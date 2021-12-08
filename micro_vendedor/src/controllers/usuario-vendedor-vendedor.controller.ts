import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UsuarioVendedor,
  Vendedor,
} from '../models';
import {UsuarioVendedorRepository} from '../repositories';

export class UsuarioVendedorVendedorController {
  constructor(
    @repository(UsuarioVendedorRepository)
    public usuarioVendedorRepository: UsuarioVendedorRepository,
  ) { }

  @get('/usuario-vendedors/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Vendedor belonging to UsuarioVendedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedor)},
          },
        },
      },
    },
  })
  async getVendedor(
    @param.path.number('id') id: typeof UsuarioVendedor.prototype.id,
  ): Promise<Vendedor> {
    return this.usuarioVendedorRepository.pertenece_a_vendedor(id);
  }
}
