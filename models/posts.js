const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  liked: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Posts', schema)
