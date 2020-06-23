import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import Typewriter from 'typewriter-effect'
/**
 * COMPONENT
 */
export const Login = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="text-center vertical-center justify-content-center">
      <img className="notebook-img" src="/Notebook.jpg" />

      <form onSubmit={handleSubmit} name={name}>
        {/* LOGIN FORM */}
        <div className="joinOuterContainer">
          <div className="heading">
            <Link to="/">
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
            </Link>
          </div>
          <h3 className="form-heading">Login</h3>
          <div className="row form-width mx-auto">
            <label className="col-sm-3" htmlFor="email">
              <span>Email</span>
            </label>
            <input className="form-control col-sm-9" name="email" type="text" />
          </div>
          <br />
          <div className="row form-width mx-auto">
            <label className="col-sm-3" htmlFor="password">
              <span>Password</span>
            </label>
            <input
              className="form-control col-sm-9"
              name="password"
              type="password"
            />
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button className="brown-btn" type="submit">
                {displayName}
              </button>
              <div className="login-msg">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatchLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapLogin, mapDispatchLogin)(Login)

/**
 * PROP TYPES
 */
Login.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
