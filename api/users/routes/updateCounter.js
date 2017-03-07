'use strict'

import { Counter } from '../model/Counter'
import boom from 'boom'

export default{
  method: 'PATCH',
  path: '/api/counter/{id}',
  config: {
    auth: false,
    cors: true
  },
  handler: (req, res) => {
    const id = req.params.id
    
    Counter.findOneAndUpdate({ _id: id }, req.payload, { new: true }, (err, result) => {
      if(err) {
        throw boom.badRequest(err)
      }

      res([{ 
        message: 'Initial updated',
      },
      result])
    })
  }
}