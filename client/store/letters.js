import axios from 'axios'
import history from '../history'

const GET_LETTERS = 'GET_LETTERS'
const DELETE_LETTER = 'REMOVE_LETTER'
const CREATE_LETTER = 'CREATE_LETTER'

const getLetters = letters => ({
  type: GET_LETTERS,
  letters
})

const createLetter = newLetter => ({
  type: CREATE_LETTER,
  newLetter
})

export const createLetterThunk = userId => async dispatch => {
  try {
    let res = await axios.post(`/api/letters/${userId}`)
    dispatch(createLetter(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchLetters = userId => async dispatch => {
  try {
    let res = await axios.get(`/api/users/letters/${userId}`)
    dispatch(getLetters(res.data))
  } catch (err) {
    console.error(err)
  }
}

const intitalState = {
  all: []
}

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_LETTERS:
      return {...state, all: action.letters}
    case CREATE_LETTER:
      return {...state, all: [...state.all, action.newLetter]}
    default:
      return state
  }
}
