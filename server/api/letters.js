const router = require('express').Router()
const {Letter} = require('../db/models')
module.exports = router

const authUser = (req, res, next) => {
  if (req.user) {
    if (req.user.dataValues.id === parseInt(req.params.userId, 10))
      return next()
  }

  res.status(403).send('access denied')
}

//api/letters
router.get('/', async (req, res, next) => {
  try {
    const letters = await Letter.findAll()
    if (letters) {
      res.json(letters)
    }
  } catch (err) {
    next(err)
  }
})

//api/letters/:userId/:letterId
router.get('/:userId/:letterId', async (req, res, next) => {
  try {
    const letter = await Letter.findAll({
      where: {
        userId: req.params.userId,
        id: req.params.letterId
      }
    })
    if (letter) {
      res.json(letter)
    }
  } catch (err) {
    next(err)
  }
})
