'use strict';

import Boom from 'boom';
import { User } from '../model/User';
import Bcrypt from 'bcryptjs';

const verifyUniqueUser = (req, res) => {
  User.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (err, user) => {
    if(user) {
      if(user.username === req.payload.username) {
        res(Boom.badRequest('Username taken!'));
      }

      if(user.email === req.payload.email) {  
        res(Boom.badRequest('Email taken!'));
      }
    }

    res(req.payload);
  });
}

const verifyCredentials = (req, res) => {
  const password = req.payload.password;

  User.findOne({
    $or: [
      { email: req.payload.email },
      { username: req.payload.username }
    ]
  }, (err, user) => {
    if(user) {
      Bcrypt.compare(password, user.password, (err, isValid) => {
        if(isValid){
          res(user);
        }
        else {
          res(Boom.badRequest('Incorrect password'));
        }
      });
    } else {
      res(Boom.badRequest('Incorrect username or email'));
    }
  });
}

export default { 
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials 
} //hmmm...