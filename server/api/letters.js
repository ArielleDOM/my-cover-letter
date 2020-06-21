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

router.post('/', async (req, res, next) => {
  try {
    const newLetter = await Letter.create(req.body)
    res.json(newLetter)
  } catch (err) {
    next(err)
  }
})

router.delete('/:letterId', async (req, res, next) => {
  try {
    const letter = await Letter.findByPk(req.params.letterId)
    await letter.destroy()
    res.status(204).send()
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.put('/:letterId', async (req, res, next) => {
  try {
    const letter = await Letter.findByPk(req.params.letterId)
    await letter.update(req.body)
    res.status(200).json(letter)
  } catch (err) {
    console.log(err)
    next(err)
  }
})
