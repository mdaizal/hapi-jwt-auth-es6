'use strict';

import { User } from '../model/User';
import Boom from 'boom';

export default {
  method: 'GET',
  path: '/api/users',
  config: {
    handler: (req, res) => {
      User
        .find()
        // Deselect the password and version fields
        .select('-password -__v')
        .exec((err, users) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          if (!users.length) {
            throw Boom.notFound('No users found!');
          }
          res(users);
        })
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: false
    // auth: {
    //   strategy: 'jwt',
    //   scope: ['admin']
    // }
  }
}