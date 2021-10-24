import axios from 'axios'

const SET_CAMPUS = 'SET_CAMPUS'

//action types 
const setCampus = (campus) => {
  return {
    type: SET_CAMPUS,
    campus
  }
}

//thunk action creater 
export const fetchCampus = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/campuses/${id}`)
      dispatch(setCampus(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

//reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPUS:
      return action.campus

    default:
      return state
  }
}