'use strict';

import bcrypt from 'bcryptjs';
import Boom from 'boom';
import { User } from '../model/User';
import createUserSchema from '../schemas/createUser';
import verifyUniqueUser from '../util/userFunctions';
import createToken from '../util/token';

function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

export default {
  method: 'POST',
  path: '/api/users',
  config: {
    // auth: {                  // only admin can create new user. for testing purpose just set auth: false to create new user.
    //   strategy: 'jwt',
    //   scope: ['admin']                           
    // },
     auth: false,
    // Before the route handler runs, verify that the user is unique
    pre: [
      { method: verifyUniqueUser.verifyUniqueUser }
    ],
    handler: (req, res) => {

      let user = new User;
      //const { email, username, password } = req.payload;  // this line is legit ES6. so e.g: user.email = email, instead of req.payload.email
      user.email = req.payload.email;
      user.username = req.payload.username;
      user.admin = false;
      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          throw Boom.badRequest(err);
        }
        user.password = hash;
        user.save((err, user) => {
          if (err) {
            throw Boom.badRequest(err);
          }
          // If the user is saved successfully, issue a JWT
          res({ id_token: createToken(user) }).code(201);
        });
      });

    },
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    }
  }
}
