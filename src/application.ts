import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
var express = require('express');
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import {MiddlewareContext, MiddlewareSequence} from '@loopback/rest';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class AppbitosApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    var app = express();
    const { auth } = require('express-openid-connect');
    const config = {
      authRequired: false,
      auth0Logout: true,
      baseURL: process.env.baseURL,
      clientID: process.env.clientID,
      issuerBaseURL: process.env.issuerBaseURL,
      secret: process.env.secret
    };
    this.middleware(auth(config));
    
   

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    //this.middleware(auth(config));


    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
