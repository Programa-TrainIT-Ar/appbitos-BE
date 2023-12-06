import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Usuario } from '../models';
import { HttpErrors, TS_TYPE_KEY } from '@loopback/rest';
import {UsuarioRepository} from '../repositories';
import { Null, repository } from '@loopback/repository';
import { Auth_Keys } from '../Keys/Auth_Keys';



const jwt=require('jsonwebtoken')
const jwtKey='ClaveAppbitos';
const expTimeJwt=(Date.now() / 1000) + (60 * 60 * 10);

@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor( @repository(UsuarioRepository)
  public usuarioRepository : UsuarioRepository) {}

  
  //GENERACION DE TOKEN JWT

  CrearTokenJWTR(usuario: Usuario){
    let token=jwt.sign({

      exp: expTimeJwt,
      data:{
        mail: usuario.mail
      }
    }, Auth_Keys.claveSecreta);
    
    return token;
  }

  CrearTokenJWTL(usuario: Usuario){
    let token=jwt.sign({

      exp: expTimeJwt,
      data:{
        nombre_usuario: usuario.nombre_usuario
      }
    }, Auth_Keys.claveSecreta);
    
    return token;
  }

  CrearTokenJWTCC(usuario: Usuario){
    let token=jwt.sign({

      exp: expTimeJwt,
      data:{
        nombre_usuario: usuario.nombre_usuario,
        password: usuario.password
      }
    }, Auth_Keys.claveSecreta);
    
    return token;
  }

  async DevolverTokenLogin(nombre_usuario:String, password: String){

       let usuario=await this.usuarioRepository.findOne({where:{nombre_usuario: nombre_usuario, password: password}});                                            
       if(usuario)   {
               
        let token =this.CrearTokenJWTL(usuario)
        usuario.password='';
        
        return {
            usuario: usuario,
            token: token,
          }
       }else{
       
        throw new HttpErrors[401]("Usuario o clave incorrectos")       
      }                     

    }

    async DevolverTokenRegistro(mail:String, usuario: Usuario){

       let usuariox=await this.usuarioRepository.findOne({where:{mail: mail}});                                            
       if(!usuariox) {
        this.usuarioRepository.create(usuario);       
        let token =this.CrearTokenJWTR(usuario)
        usuario.password='';
        
        return {
            usuario: usuario,
            token: token,
          }
       }else{
        throw new HttpErrors[401]("Mail ya registrado")    
      }                     

    }

    static verificartoken(token: string){
      let decoded = jwt.verify(token,Auth_Keys.claveSecreta);
      return decoded;
  }

}
