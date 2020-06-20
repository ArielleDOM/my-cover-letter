import axios from 'axios'
import history from '../history'

const GET_SINGLE_LETTER = 'SINGLE_LETTER'
const DELETE_LETTER = 'REMOVE_LETTER'

const defaultLetter = {}

const getSingleLetter = singleletter => ({
  type: GET_SINGLE_LETTER,
  singleletter
})

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
    default:
      return state
  }
}
