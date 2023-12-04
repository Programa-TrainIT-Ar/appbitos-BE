import { AuthenticationBindings, AuthenticationMetadata, AuthenticationStrategy } from "@loopback/authentication";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import {JwtService} from '../services/jwt.service';
import { inject } from "@loopback/core";
import { Auth_Keys } from '../Keys/Auth_Keys';


export class BasicAuthenticationStrategy implements AuthenticationStrategy {
    name: string = 'basic';
  
    constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata[]

    ) {}
  
    async authenticate(request: Request): Promise<UserProfile | undefined> {
      let token = parseBearerToken(request);
      if (!token) {
        throw new HttpErrors[401]("No existe token en la solicitud.")
      }
      else{
        let info = JwtService.verificartoken(token);
        let tipoaux = this.metadata[0].options!;
        let tipo = tipoaux[0];
        
        let usuario:UserProfile = Object.assign({
          id: "",
          nombre_usuario: ""
        })
        if (tipo == Auth_Keys.v_registro){
          let usuario:UserProfile = Object.assign({
            mail: info.mail
          })
          
        }else if(tipo == Auth_Keys.v_login){
          let usuario:UserProfile = Object.assign({
            nombre_usuario: info.nombre_usuario
          })
        }
        return usuario
      }

    }
  

  }