import axios from 'axios'
import history from '../history'

const GET_LETTERS = 'GET_LETTERS'
const REMOVE_LETTER = 'REMOVE_LETTER'

const getLetters = letters => ({
  type: GET_LETTERS,
  letters
})

export const fetchLetters = userId => async dispatch => {
  try {
    let res = await axios.get(`/api/users/letters/${userId}`)
    dispatch(getLetters(res.data))
  } catch (err) {
    console.error(err)
  }
}

// const intitalState = {
//   letters: [],
//   singleLetter: {}
// }

export default function(state = [], action) {
  switch (action.type) {
    case GET_LETTERS:
      return action.letters
    default:
      return state
  }
}
