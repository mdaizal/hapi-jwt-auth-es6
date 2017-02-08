'use strict';

import Boom from 'boom';
import { User } from '../model/User';
import authenticateUserSchema from '../schemas/authenticateUsers';
import verifyCredentials from '../util/userFunctions';
import createToken from '../util/token';

export default {
  method: 'POST',
  path: '/api/users/authenticate',
  config: {
    auth: false,
    pre: [
      { method: verifyCredentials.verifyCredentials, assign: 'user' }
    ],
    handler: (req, res) => {
      res({ id_token: createToken(req.pre.user)}).code(201);
    },
    validate: {
      payload: authenticateUserSchema
    }
  }
}