import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class LandingPage extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className="landingPage">
        <h1>My Cover Letter</h1>
        <h3>
          Keep track of all your cover letters, and quickly replace phrases,
          dates, or names
        </h3>
      </div>
    )
  }
}
