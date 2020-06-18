import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchLetters} from '../store/letter'
import Navbar from './navbar'

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
            return <div key={letter.id}>{letter.title}</div>
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
  fetchLetters: userId => dispatch(fetchLetters(userId))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
