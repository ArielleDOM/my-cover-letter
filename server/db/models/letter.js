const Sequelize = require('sequelize')
const db = require('../db')

const Letter = db.define('letter', {
  title: {
    type: Sequelize.TEXT,
    unique: true
  },
  body: {
    type: Sequelize.TEXT
  },
  phrases: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = Letter
