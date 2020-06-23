const Sequelize = require('sequelize')
const db = require('../db')

const Letter = db.define('letter', {
  title: {
    type: Sequelize.TEXT,
    defaultValue: 'Untitled Cover Letter'
  },
  body: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  phrases: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [['', '']]
  }
})

module.exports = Letter
