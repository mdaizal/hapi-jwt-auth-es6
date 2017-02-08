'use strict';

//const Joi = require('joi');
import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

const payloadSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  email: Joi.string().email(),
  admin: Joi.boolean()
});

const paramsSchema = Joi.object({
  id: Joi.objectId().required()
});

export default {
  payloadSchema: payloadSchema,
  paramsSchema: paramsSchema
}