import { AuthenticationStrategy } from "@loopback/authentication";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import {JwtService} from '../services/jwt.service';

export class BasicAuthenticationStrategy implements AuthenticationStrategy {
    name: string = 'basic';
  
    constructor(
    ) {}
  
    async authenticate(request: Request): Promise<UserProfile | undefined> {
      let token = parseBearerToken(request);
      if (!token) {
        throw new HttpErrors[401]("No existe token en la solicitud.")
      }
      else{
        let info = JwtService.verificartoken(token);
        let usuario:UserProfile = Object.assign({
          id: info.id,
          email: info.email
        })
        return usuario
      }

    }
  

  }