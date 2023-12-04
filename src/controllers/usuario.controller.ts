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
  HttpErrors,
} from '@loopback/rest';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import { JwtService } from '../services';
import { inject, service } from '@loopback/core';
import { create } from 'domain';
import {authenticate, AuthenticationBindings, AuthenticationMetadata} from '@loopback/authentication';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { Auth_Keys } from '../Keys/Auth_Keys';


class Credenciales{
  nombre_usuario: string;
  password:string;
}

export class UsuarioController {
  constructor(
    
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(JwtService)
    public servicioJwt: JwtService,
    @inject(SecurityBindings.USER, { optional: true })
    private usuarioAutenticado: UserProfile,


  ) {}

  @post('/registrar_usuario')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Usuario //Omit<Usuario, 'id'>,
  ): Promise<Object> { 
    usuario.activo = false;   
    return this.servicioJwt.DevolverTokenRegistro(usuario.mail, usuario);
  }

  @authenticate({
    strategy:"basic",
    options: [Auth_Keys.v_registro]
  })
  @post('/2validar-registro-usuario')
  @response(200,{
    description:"Validacion de registro de usuario ",
  })
    async verificarusuariotoken()
    : Promise<object>{
      //console.log(this.usuarioAutenticado.email);
      //console.log(this.usuarioAutenticado.id)
      let usuario = await this.usuarioRepository.findOne({
        where:{
          email: this.usuarioAutenticado.email,
          activo: false
        }
      
      })
      if(usuario){
        usuario.activo = true; 
        this.usuarioRepository.updateById(usuario.id, usuario);
        return {usuario}
      }
      
      return new HttpErrors[401]("No se pudo verificar el usuario");
  }




  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @post('login',{
    responses:{
      '200':{
        description: 'Identificacion de usuarios',
        content: {'application/json': {schema: getModelSchemaRef(Credenciales)}}
    }
  }
  })
  async identificar(
  @requestBody() credenciales:Credenciales
  
  ): Promise<object>{      
    return this.servicioJwt.DevolverTokenLogin(credenciales.nombre_usuario, credenciales.password)
  }

  @authenticate({
    strategy:"basic",
    options: [Auth_Keys.v_login]
  })
  @post('/validar-login-usuario')
  @response(200,{
    description:"Validacion de login de usuario ",
  })
    async verificarlogintoken()
    : Promise<object>{
      let usuario = await this.usuarioRepository.findOne({
        where:{
          nombre_usuario: this.usuarioAutenticado.nombre_usuario,
          id: this.usuarioAutenticado.id,
        }
      })
      if(usuario){
        return {usuario}
      }
      
      return new HttpErrors[401]("No se pudo verificar el usuario");
  }






}
