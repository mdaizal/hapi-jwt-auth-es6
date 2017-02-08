'use strict';

//const Joi = require('joi');
import Joi from 'joi';

export const checkUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string()
});

//module.exports = checkUserSchema;