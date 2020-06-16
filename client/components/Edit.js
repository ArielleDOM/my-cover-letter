import React from 'react'
import {connect} from 'react-redux'
import Typewriter from 'typewriter-effect'

/**
 * COMPONENT
 */

const initialState = {
  title: '',
  body: '',
  phrases: []
}
export class Edit extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChange() {
    event.preventDefault()
  }
  render() {
    return (
      <div id="edit">
        <button id="add-bttn" type="button">
          Add
        </button>
        <div id="phrases">
          <input id="find" type="text" onChange={this.handleChange} />
          <input id="replace" type="text" onChange={this.handleChange} />
        </div>
        <input
          name="body"
          id="letter"
          type="text"
          onChange={this.handleChange}
        />
        <button id="submit-bttn" type="button">
          Submit
        </button>
      </div>
    )
  }
}
