import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsuarioVendedor} from '../models';
import {UsuarioVendedorRepository} from '../repositories';

export class UsuariovendedorController {
  constructor(
    @repository(UsuarioVendedorRepository)
    public usuarioVendedorRepository : UsuarioVendedorRepository,
  ) {}

  @post('/usuario')
  @response(200, {
    description: 'UsuarioVendedor model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioVendedor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioVendedor, {
            title: 'NewUsuarioVendedor',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioVendedor: Omit<UsuarioVendedor, 'id'>,
  ): Promise<UsuarioVendedor> {
    return this.usuarioVendedorRepository.create(usuarioVendedor);
  }

  @get('/usuario/count')
  @response(200, {
    description: 'UsuarioVendedor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioVendedor) where?: Where<UsuarioVendedor>,
  ): Promise<Count> {
    return this.usuarioVendedorRepository.count(where);
  }

  @get('/usuario')
  @response(200, {
    description: 'Array of UsuarioVendedor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioVendedor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioVendedor) filter?: Filter<UsuarioVendedor>,
  ): Promise<UsuarioVendedor[]> {
    return this.usuarioVendedorRepository.find(filter);
  }

  @patch('/usuario')
  @response(200, {
    description: 'UsuarioVendedor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioVendedor, {partial: true}),
        },
      },
    })
    usuarioVendedor: UsuarioVendedor,
    @param.where(UsuarioVendedor) where?: Where<UsuarioVendedor>,
  ): Promise<Count> {
    return this.usuarioVendedorRepository.updateAll(usuarioVendedor, where);
  }

  @get('/usuario/{id}')
  @response(200, {
    description: 'UsuarioVendedor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioVendedor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UsuarioVendedor, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioVendedor>
  ): Promise<UsuarioVendedor> {
    return this.usuarioVendedorRepository.findById(id, filter);
  }

  @patch('/usuario/{id}')
  @response(204, {
    description: 'UsuarioVendedor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioVendedor, {partial: true}),
        },
      },
    })
    usuarioVendedor: UsuarioVendedor,
  ): Promise<void> {
    await this.usuarioVendedorRepository.updateById(id, usuarioVendedor);
  }

  @put('/usuario/{id}')
  @response(204, {
    description: 'UsuarioVendedor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarioVendedor: UsuarioVendedor,
  ): Promise<void> {
    await this.usuarioVendedorRepository.replaceById(id, usuarioVendedor);
  }

  @del('/usuario/{id}')
  @response(204, {
    description: 'UsuarioVendedor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuarioVendedorRepository.deleteById(id);
  }
}
