import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
export const Loading = () => {
  return (
    <div>
      <img src="/animat-pencil.gif" />
    </div>
  )
}

export default Loading
