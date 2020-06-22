import axios from 'axios'
import history from '../history'

const GET_LETTERS = 'GET_LETTERS'
const DELETE_LETTER = 'DELETE_LETTER'
const CREATE_LETTER = 'CREATE_LETTER'

const getLetters = letters => ({
  type: GET_LETTERS,
  letters
})

const createLetter = newLetter => ({
  type: CREATE_LETTER,
  newLetter
})

const deleteLetter = letterId => ({
  type: DELETE_LETTER,
  letterId
})

export const deleteLetterThunk = letterId => async dispatch => {
  try {
    await axios.delete(`/api/letters/${letterId}`)
    dispatch(deleteLetter(letterId))
  } catch (err) {
    console.error(err)
  }
}

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

export default function(state = [], action) {
  switch (action.type) {
    case GET_LETTERS:
      return action.letters
    case CREATE_LETTER:
      return [...state, action.newLetter]
    case DELETE_LETTER:
      return state.filter(letter => letter.id !== action.letterId)
    default:
      return state
  }
}
