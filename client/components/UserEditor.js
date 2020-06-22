import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleLetter} from '../store/singletter'
import Navbar from './navbar'
import {Link} from 'react-router-dom'
import EditorForm from '../components/EditorForm'

/**
 * COMPONENT
 */

export class UserEditor extends React.Component {
  componentDidMount() {
    this.props.fetchSingleLetter(
      this.props.user.id,
      this.props.match.params.letterId
    )
  }

  render() {
    let data
    if (this.props.singleletter) {
      data = this.props.singleletter
    }
    return (
      <div>
        <EditorForm letter={data} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    singleletter: state.singleletter[0],
    user: state.user
  }
}

const mapDispatch = dispatch => ({
  fetchSingleLetter: (userId, letterId) =>
    dispatch(fetchSingleLetter(userId, letterId))
})

export default connect(mapState, mapDispatch)(UserEditor)
