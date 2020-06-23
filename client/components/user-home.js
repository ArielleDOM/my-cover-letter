import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  fetchLetters,
  createLetterThunk,
  deleteLetterThunk
} from '../store/letters'
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
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchLetters(this.props.user.id)
  }
  handleDelete(userId, letterId) {
    event.preventDefault()
    this.props.deleteLetter(userId, letterId)
  }

  handleCreate(event) {
    event.preventDefault()
    this.props.createLetter(this.props.user.id)
  }

  render() {
    let {letters, user, email} = this.props

    let newLetter = letters[letters.length - 1]
    let data

    if (newLetter) {
      data = newLetter
    }

    let home
    if (letters.length === 0 && letters) {
      home = <div>You have no cover letters</div>
    } else {
      home = (
        <div>
          {letters.map(letter => {
            return (
              <div key={letter.id} className="letterContainer">
                <h3>{letter.title}</h3>
                <div className="home-btns">
                  <Link to={`/letters/${user.id}/${letter.id}`}>
                    <button className="brown-btn" type="button">
                      Edit
                    </button>
                  </Link>
                  <div className="divider" />
                  <button
                    className="delete-btn"
                    type="button"
                    onClick={() => this.handleDelete(user.id, letter.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
    return (
      <div className="user-home">
        <Navbar />
        <button className="brown-btn" type="button" onClick={this.handleCreate}>
          Create
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
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  fetchLetters: userId => dispatch(fetchLetters(userId)),
  createLetter: userId => dispatch(createLetterThunk(userId)),
  deleteLetter: (userId, letterId) =>
    dispatch(deleteLetterThunk(userId, letterId))
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
