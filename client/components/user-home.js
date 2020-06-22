import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchLetters, createLetterThunk} from '../store/letters'
import Navbar from './navbar'
import {Link} from 'react-router-dom'
// import {all} from '../../server/api/letters'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.handleCreate = this.handleCreate.bind(this)
  }

  componentDidMount() {
    this.props.fetchLetters(this.props.user.id)
  }

  handleCreate(event) {
    event.preventDefault()

    this.props.createLetter(this.props.user.id)
  }

  render() {
    let {letters, user, email, createLetter} = this.props
    let allLetters = letters.all

    let newLetter = allLetters[allLetters.length - 1]
    let data

    if (newLetter) {
      data = newLetter
    }

    let home
    if (letters.length === 0 && letters) {
      home = <div>You have no cover letters</div>
    } else {
      home = (
        <div id="letters-view">
          {letters.all.map(letter => {
            return (
              <Link key={letter.id} to={`/letters/${user.id}/${letter.id}`}>
                <div>{letter.title}</div>
              </Link>
            )
          })}
        </div>
      )
    }
    return (
      <div>
        <Navbar />
        <button name="create-btn" type="button" onClick={this.handleCreate}>
          Create Cover
        </button>
        {home}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    letters: state.letters,
    email: state.user.email,
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  fetchLetters: userId => dispatch(fetchLetters(userId)),
  createLetter: userId => dispatch(createLetterThunk(userId))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
