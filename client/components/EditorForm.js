import React from 'react'
import {connect} from 'react-redux'
import singletter, {
  fetchSingleLetter,
  saveLetterThunk
} from '../store/singletter'
import Navbar from './navbar'
import {Link} from 'react-router-dom'
import supertest from 'supertest'
import Loading from '../components/Loading'

class EditorForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      body: '',
      phrases: [],
      newCover: '',
      warningMessage: 'This field is required!'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const prev = x => (prevProps.letter || {})[x]
    const curr = x => (this.props.letter || {})[x]

    const changed = x => prev(x) !== curr(x)
    const update = x => this.setState({[x]: curr(x)})

    if (changed('title')) {
      update('title')
    }

    if (changed('body')) {
      update('body')
    }

    if (changed('phrases')) {
      update('phrases')
    }
    if (prevProps.letter !== this.props.letter) {
      this.setState({
        title: this.props.letter.title,
        body: this.props.letter.body,
        phrases: this.props.letter.phrases
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAdd() {
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

  handleSave() {
    event.preventDefault()
    const newLetter = {
      title: this.state.title,
      body: this.state.body,
      phrases: this.state.phrases
    }
    this.props.saveLetter(this.props.user.id, this.props.letter.id, newLetter)
    location.reload()
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
    let {saveLetter, letter} = this.props
    let {title, body, phrases} = this.state
    let view

    if (letter) {
      view = (
        <div className="user-writing">
          <div id="edit">
            <input
              className="edit-title-input"
              name="title"
              type="text"
              placeholder="Enter Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            {!this.state.title &&
              this.state.warningMessage && (
                <span className="warning">{this.state.warningMessage}</span>
              )}
            <div className="add-btn">
              <button
                className="brown-btn"
                type="button"
                onClick={this.handleAdd}
              >
                Add
              </button>
            </div>
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
                    className="delete-btn"
                    type="button"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    value={find}
                    onChange={changeFind}
                    placeholder="Find phrase"
                  />
                  <input
                    type="text"
                    value={replace}
                    onChange={changeReplace}
                    placeholder="Replace phrase"
                  />
                </div>
              )
            })}
            <div className="cover-letter">
              <textarea
                name="body"
                id="letter"
                type="text"
                value={this.state.body}
                onChange={this.handleChange}
              />
            </div>
            <button
              className="brown-btn"
              type="button"
              onClick={this.handleSave}
              disabled={!this.state.title}
            >
              Save
            </button>
            <button
              className="brown-btn"
              type="button"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="user-new-cover">
            <div className="user-new-cover-writing">{this.state.newCover}</div>
          </div>
        </div>
      )
    }
    return (
      <div className="user-editor-form">
        <Navbar />
        {view}
      </div>
    )
  }
}

const mapState = state => ({
  singletter: state.singleletter[0],
  user: state.user
})

const mapDispatch = dispatch => ({
  saveLetter: (userId, letterId, data) =>
    dispatch(saveLetterThunk(userId, letterId, data)),
  fetchSingleLetter: id => dispatch(fetchSingleLetter(id))
})

export default connect(mapState, mapDispatch)(EditorForm)
