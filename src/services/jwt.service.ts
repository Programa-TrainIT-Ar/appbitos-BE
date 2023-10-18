import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Usuario } from '../models';
import { TS_TYPE_KEY } from '@loopback/rest';

const jwt=require('jsonwebtoken')
const jwtKey='ClaveAppbitos';
const expTimeJwt=(Date.now() / 1000) + (60 * 60 * 10);

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) {}

  //GENERACION DE TOKEN JWT

  CrearTokenJWT(usuario: Usuario){

    let claveSecreta=jwtKey;

    let token=jwt.sign({

      exp: expTimeJwt,
      data:{
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario
      }
    }, claveSecreta);
    
    return token;

  }
  
}
