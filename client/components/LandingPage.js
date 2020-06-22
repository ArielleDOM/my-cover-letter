import React from 'react'
import {connect} from 'react-redux'
import Typewriter from 'typewriter-effect'
import {Link} from 'react-router-dom'
import {Edit} from './Edit'

/**
 * COMPONENT
 */
export class LandingPage extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div id="home">
        <div id="links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div id="logo">
          <Typewriter
            onInit={typewriter => {
              typewriter
                .typeString('My Cover Letter')
                // .callFunction(() => {
                //   console.log("String typed out!");
                // })
                .start()
            }}
          />
        </div>
        <div id="description">
          Keep track of all your cover letters, and quickly replace phrases,
          dates, or names
        </div>
        <Edit />
      </div>
    )
  }
}
