import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleLetter} from '../store/singletter'
import Navbar from './navbar'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

const initialState = {
  title: '',
  body: '',
  phrases: [],
  newCover: ''
}
export class UserEditor extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.findAndReplace = this.findAndReplace.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleLetter(
      this.props.user.id,
      this.props.match.params.letterId
    )
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  findAndReplace(text, find, replace) {
    text.replace(find, replace)
  }

  handleAdd(event) {
    let phrases = this.state.phrases
    phrases = [...phrases, ['', '']]
    this.setState({phrases})
  }

  handleDelete(event) {
    let phrases = this.state.phrases
    let index = Number(event.target.name)

    phrases.splice(index, 1)

    this.setState({
      phrases
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let letter = this.state.body
    for (let [find, replace] of this.state.phrases) {
      letter = letter.replace(find, replace)
    }

    this.setState({
      newCover: letter
    })
  }

  render() {
    console.log('USER EDITOR PROPS', this.state)
    return (
      <div>
        <Navbar />
        <div id="writing">
          <div id="edit">
            <Link to="/home">Test</Link>
            <button id="add-bttn" type="button" onClick={this.handleAdd}>
              Add
            </button>
            {this.state.phrases.map(([find, replace], index) => {
              const changeFind = event => {
                let phrases = this.state.phrases
                phrases[index][0] = event.target.value
                this.setState({phrases})
              }
              const changeReplace = event => {
                let phrases = this.state.phrases
                phrases[index][1] = event.target.value
                this.setState({phrases})
              }
              return (
                <div key={index}>
                  <button
                    name={index}
                    id="delete-btn"
                    type="button"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                  <input type="text" value={find} onChange={changeFind} />
                  <input type="text" value={replace} onChange={changeReplace} />
                </div>
              )
            })}
            <textarea
              name="body"
              id="letter"
              type="text"
              defaultValue={this.state.body}
              onChange={this.handleChange}
            />
            <button id="save-bttn" type="button">
              Save
            </button>
            <button id="submit-bttn" type="button" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
          <div id="new-cover">{this.state.newCover}</div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    user: state.user,
    singleletter: state.singleletter
  }
}

const mapDispatch = dispatch => ({
  fetchSingleLetter: (userId, letterId) =>
    dispatch(fetchSingleLetter(userId, letterId))
})

export default connect(mapState, mapDispatch)(UserEditor)
