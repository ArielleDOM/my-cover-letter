const router = require('express').Router()
const {Letter} = require('../db/models/letter')
module.exports = router

const authUser = (req, res, next) => {
  if (req.user) {
    if (req.user.dataValues.id === parseInt(req.params.userId, 10))
      return next()
  }

  res.status(403).send('access denied')
}

//api/letters/:userId

router.get('/userId', authUser, async (req, res, next) => {
  try {
    const letters = await Letter.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (letters) {
      res.json(letters)
    } else {
      res.json('You have no cover letters')
    }
  } catch (err) {
    next(err)
  }
})

//api/letters/:letterId
router.get('/:letterId', authUser, async (req, res, next) => {
  try {
    const letters = await Letter.findAll({
      where: {
        id: req.params.letterId
      }
    })
    if (letters) {
      res.json(letters)
    }
  } catch (err) {
    next(err)
  }
})
