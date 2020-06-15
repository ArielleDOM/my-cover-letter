const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const authUser = (req, res, next) => {
  if (req.user) {
    if (req.user.dataValues.id === parseInt(req.params.userId, 10))
      return next()
  }

  res.status(403).send('access denied')
}

router.get('/', authUser, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//api/users/:userId
router.get('/:userId', authUser, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
