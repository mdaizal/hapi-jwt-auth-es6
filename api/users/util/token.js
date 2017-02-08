'use strict';

import jwt from 'jsonwebtoken';
import { Secret } from '../../../config'

const createToken = (user) => {
  let scopes;

  if(user.admin){
    scopes = 'admin';
  }

  return ( 
    {token: jwt.sign(
              { id: user._id, username: user.username, scope: scopes},
              Secret,
              { algorithm: 'HS256', expiresIn: '1h'}
            ),
     username: user.username
    }
  );
}

export default createToken;