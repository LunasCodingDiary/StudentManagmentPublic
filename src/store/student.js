import axios from 'axios'

const SET_STUDENT = 'SET_STUDENT'

const setStudent = (student) => {
  return {
    type: SET_STUDENT,
    student
  }
}

export const fetchStudent = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/students/${id*1}`)
      dispatch(setStudent(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENT:
      return action.student
    default:
      return state
  }
}