'use strict';

// const bcrypt = require('bcryptjs');
// const Boom = require('boom');
// const User = require('../model/User');
// const checkUserSchema = require('../schemas/checkUser');
// const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;

import bcrypt from 'bcryptjs';
import Boom from 'boom';
import User from '../model/User';
import checkUserSchema from '../schemas/checkUser';
import verifyUniqueUser from '../util/userFunctions';

export default {
  method: 'POST',
  path: '/api/users/check',
  config: {
    auth: false,
    pre: [
      { method: verifyUniqueUser.verifyUniqueUser, assign: 'user' }
    ],
    handler: (req, res) => {
      res(req.pre.user);
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: checkUserSchema
    }
  }
}
