'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const counterModel = new Schema({
  initial: { type: Number }
})

export const Counter = mongoose.model('Counter', counterModel)