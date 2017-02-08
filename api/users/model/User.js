'use strict';

import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const userModel = new Schema({
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true }
});
export const User = Mongoose.model('User', userModel);
//export default Mongoose.model('User', userModel); //ni pun boleh so import tak perlu {}, boleh bagi apa-apa nama pada object