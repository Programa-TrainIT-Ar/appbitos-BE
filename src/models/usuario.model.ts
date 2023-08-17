import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Usuario extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;
//Es de tipo jsonb la direccion
  @property({
    type: 'object',
    jsonSchema: {
      properties: {
        calle: { type: 'string' },
        numero: { type: 'string' },
        piso: { type: 'string' },
        mano: { type: 'string' }
        // Agrega otros subcampos aquí si es necesario
      },
    },
  })
  direccion?: object;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
