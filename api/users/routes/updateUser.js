'use strict';

import Boom from 'boom';
import { User } from '../model/User';
import updateUserSchema from '../schemas/updateUser';
import verifyUniqueUser from '../util/userFunctions';

export default {
  method: 'PATCH',
  path: '/api/users/{id}',
  config: {
    pre: [
      { method: verifyUniqueUser.verifyUniqueUser, assign: 'user' }
    ],
    handler: (req, res) => {
      const id = req.params.id;
      User
        .findOneAndUpdate({ _id: id }, req.pre.user, (err, user) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!user) {
            throw Boom.notFound('User not found!');
          }
          res({message: 'User updated!'});
        });      
    },
    validate: {
      payload: updateUserSchema.payloadSchema,
      params: updateUserSchema.paramsSchema
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
  
}