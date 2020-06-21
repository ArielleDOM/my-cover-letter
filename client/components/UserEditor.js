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

// import React from 'react'
// import {connect} from 'react-redux'
// import {fetchSingleLetter} from '../store/singletter'
// import Navbar from './navbar'
// import {Link} from 'react-router-dom'

// /**
//  * COMPONENT
//  */

// const initialState = {
//   title: '',
//   body: '',
//   phrases: [],
//   newCover: ''
// }
// export class UserEditor extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       title: '',
//       body: '',
//       phrases: [],
//       newCover: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.handleAdd = this.handleAdd.bind(this)
//     this.handleDelete = this.handleDelete.bind(this)
//   }

//   // componentWillReceiveProps(nextProps) {
//   //   // Any time props.email changes, update state.
//   //   this.props.fetchSingleLetter(this.props.userId, this.props.match.params.letterId)

//   //   let letter = nextProps.singleletter[0]
//   //     this.setState({
//   //       title: letter.title,
//   //       body: letter.body,
//   //       phrases: letter.phrases
//   //     });
//   // }

//   componentDidMount() {
//     this.props.fetchSingleLetter(
//       this.props.user.id,
//       this.props.match.params.letterId
//     )

//     console.log('in mount', this.props)
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//   handleAdd(event) {
//     let phrases = this.state.phrases
//     phrases = [...phrases, ['', '']]
//     this.setState({phrases})
//   }

//   handleDelete(event) {
//     let phrases = this.state.phrases
//     let index = Number(event.target.name)

//     phrases.splice(index, 1)

//     this.setState({
//       phrases
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()

//     let letter = this.state.body
//     for (let [find, replace] of this.state.phrases) {
//       letter = letter.replace(find, replace)
//     }

//     this.setState({
//       newCover: letter
//     })
//   }

//   render() {
//     let {singleletter, user} = this.props
//     let letter;

//     let view;

//     if(singleletter[0]){
//       letter  = singleletter[0]

//       view = (
//         <div onLoad ={this.settingTheState}>
//         <Navbar />
//         <div id="writing">
//           <div id="edit">
//             <Link to="/home">Test</Link>
//             <button id="add-bttn" type="button" onClick={this.handleAdd}>
//               Add
//             </button>
//             {letter.phrases.map(([find, replace], index) => {
//               const changeFind = event => {
//                 let phrases = letter.phrases
//                 phrases[index][0] = event.target.value
//                 this.setState({phrases})
//               }
//               const changeReplace = event => {
//                 let phrases = letter.phrases
//                 phrases[index][1] = event.target.value
//                 this.setState({phrases})
//               }
//               return (
//                 <div key={index}>
//                   <button
//                     name={index}
//                     id="delete-btn"
//                     type="button"
//                     onClick={this.handleDelete}
//                   >
//                     Delete
//                   </button>
//                   <input type="text" value={find} onChange={changeFind} />
//                   <input type="text" value={replace} onChange={changeReplace} />
//                 </div>
//               )
//             })}
//             <textarea
//               name="body"
//               id="letter"
//               type="text"
//               defaultValue={letter.body}
//               onChange={this.handleChange}
//             />
//             <button id="save-bttn" type="button">
//               Save
//             </button>
//             <button id="submit-bttn" type="button" onClick={this.handleSubmit}>
//               Submit
//             </button>
//           </div>
//           <div id="new-cover">{this.state.newCover}</div>
//         </div>
//       </div>
//       )
//     }
//     return (
//       <div>{view}</div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */

// const mapState = state => {
//   return {
//     user: state.user,
//     singleletter: state.singleletter
//   }
// }

// const mapDispatch = dispatch => ({
//   fetchSingleLetter: (userId, letterId) =>
//     dispatch(fetchSingleLetter(userId, letterId))
// })

// export default connect(mapState, mapDispatch)(UserEditor)
