'use strict';

import Hapi from 'hapi';
import Joi from 'joi';
import Boom from 'boom';
import Glob from 'glob';
import Mongoose from 'mongoose';
import Path from 'path';
import { Secret } from './config';

const server = new Hapi.Server();
server.connection({ port:3000 });

const dbUrl = 'mongodb://localhost:27017/hapi-app';

server.register(require('hapi-auth-jwt'), (err) => {
  server.auth.strategy('jwt', 'jwt', 'required', {
    key: Secret,
    verifyOptions: { algorithms: ['HS256'] }
  });
  
  Glob.sync('api/**/routes/*.js', {
    root: __dirname
  }).forEach(file => {
    const route = require(Path.join(__dirname, file));
    //console.log(`Dir: ${__dirname}. File ${file}`);
    //console.log(route.default.path);
    console.log(`Attaching route: ${route.default.path}. method: ${route.default.method}`)
    server.route(route.default);
  });
});

server.start((err) => {
  if(err) {
    throw err;
  }
  console.log(`Server is running at ${ server.info.uri }`);

  Mongoose.Promise = global.Promise;
  Mongoose.connect(dbUrl, {}, (err) => {
    if(err) {
      throw err;
    }
  });
});