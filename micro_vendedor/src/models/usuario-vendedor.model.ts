import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vendedor} from './vendedor.model';

@model()
export class UsuarioVendedor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Vendedor, {name: 'pertenece_a_vendedor'})
  id_vendedor: number;

  constructor(data?: Partial<UsuarioVendedor>) {
    super(data);
  }
}

export interface UsuarioVendedorRelations {
  // describe navigational properties here
}

export type UsuarioVendedorWithRelations = UsuarioVendedor & UsuarioVendedorRelations;
