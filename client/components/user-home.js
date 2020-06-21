import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchLetters} from '../store/letters'
import {fetchSingleLetter} from '../store/singletter'
import Navbar from './navbar'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchLetters(this.props.user.id)
  }

  render() {
    let {letters, user, email} = this.props
    let home
    if (letters.length === 0 && letters) {
      home = <div>You have no cover letters</div>
    } else {
      home = (
        <div id="letters-view">
          {letters.map(letter => {
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
        <button name="create-btn" type="button">
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
  fetchSingleLetter: (userId, letterId) =>
    dispatch(fetchSingleLetter(userId, letterId))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
