import axios from 'axios';

const SET_CAMPUSES = 'SET_CAMPUSES'
const CREATE_CAMPUS = 'CREATE_CAMPUS'
const DESTROY_CAMPUS = 'DESTROY_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'

const setCampuses = (campuses) => {
  return {
    type: SET_CAMPUSES,
    campuses
  }
}

const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  }
}

const _destroyCampus = (campus) => {
  return {
    type: DESTROY_CAMPUS,
    campus
  }
}

const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
}

//thunk

export const fetchCampuses = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/campuses')
      dispatch(setCampuses(data))
    } catch(err) {
      console.log(err)
    }
  }
}

export const createCampus = (campus,history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/campuses', campus)
      dispatch(_createCampus(data))
      history.push('/');
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateCampus = (campus, history) => {
  return async (dispatch) => {
    try {
      console.log(campus)
      const {data} = await axios.put(`/api/campuses/${campus.id}`, campus)
      dispatch(_updateCampus(data));
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
}

export const destroyCampus = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/campuses/${id}`);
      dispatch(_destroyCampus({id: id*1}))
      history.push('/') //it's okay here 
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_CAMPUSES:
      return action.campuses

    case CREATE_CAMPUS:
      return [...state, action.campus];

    case UPDATE_CAMPUS:
      return [...state, state.map((campus) =>
          campus.id === action.campus.id ? action.campus : campus
      )]; 
    case DESTROY_CAMPUS:
      return state.filter(campus=> campus.id !== action.campus.id);
      
  
    default:
      return state
  }
}

