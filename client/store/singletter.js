import axios from 'axios'
import history from '../history'

const GET_SINGLE_LETTER = 'SINGLE_LETTER'
const DELETE_LETTER = 'REMOVE_LETTER'

const getSingleLetter = singleLetter => ({
  type: GET_SINGLE_LETTER,
  singleLetter
})

export const fetchSingleLetter = (userId, letterId) => async dispatch => {
  try {
    let res = await axios.get(`/api/users/letters/${userId}/${letterId}`)
    dispatch(getSingleLetter(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_LETTER:
      return action.singleLetter
    default:
      return state
  }
}
