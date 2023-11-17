import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const nodemailer=require('nodemailer');

@injectable({scope: BindingScope.TRANSIENT})
export class EmailenvioService {
  constructor(/* Add @inject to inject parameters */) {}


  async envioMail(){

    const config = {
  
      host:  'smtp.gmail.com',
      port: 587,
  
      auth :{
  
        user : 'appbitosbackend@gmail.com',
        pass : 'rlan czml yujk qqub'
  
      }
    }
  
      const mensaje ={
        from:'appbitosbackend@gmail.com',
        to: 'pabloabaldiez@gmail.com',
        subject:'Correo de pruebas',
        text: 'Prueba de envio' 
  
      }
      const transport =nodemailer.createTransport(config);
      const info = await transport.sendMail(mensaje)
  
      console.log(info)
  }
  

  





}
