const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    loc: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
        required: true
      }, 
      coordinates: {
        type: [], // LATITUD , LONGITUD
        required: true
      }
    },
    highlight: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Place', schema)
