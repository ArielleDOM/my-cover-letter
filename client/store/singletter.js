import axios from 'axios'
import history from '../history'

const GET_SINGLE_LETTER = 'SINGLE_LETTER'
const SAVE_LETTER = 'SAVE LETTER'

const defaultLetter = {}

const getSingleLetter = singleletter => ({
  type: GET_SINGLE_LETTER,
  singleletter
})

const saveLetter = (id, data) => ({
  type: SAVE_LETTER,
  id,
  data
})

export const saveLetterThunk = (userId, letterId, data) => {
  return async dispatch => {
    await axios.put(`/api/letters/${userId}/${letterId}`, data)
    dispatch(saveLetter(letterId, data))
  }
}

export const fetchSingleLetter = (userId, letterId) => async dispatch => {
  try {
    let res = await axios.get(`/api/letters/${userId}/${letterId}`)
    dispatch(getSingleLetter(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultLetter, action) {
  switch (action.type) {
    case GET_SINGLE_LETTER:
      return action.singleletter
    case SAVE_LETTER:
      return action.data
    default:
      return state
  }
}
