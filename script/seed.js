'use strict'

const db = require('../server/db')
const {User, Letter} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const letters = await Promise.all([
    Letter.create({
      title: 'main cover letter',
      body:
        'I use to work at [old company], and I really want a job at, [company name]',
      phrases: [['[old company]', ''], ['[company name', '']],
      userId: 1
    }),
    Letter.create({
      title: 'cover letter',
      body: 'I really reall really want a job at [company name]',
      phrases: [['[company name', '']],
      userId: 2
    }),
    Letter.create({
      title: 'CL',
      body: 'This is my cover letter for [company name]',
      phrases: [['[company name', '']],
      userId: 1
    })
  ])

  console.log(`seeded ${users.length} users and ${letters.length} letters`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
