import axios from 'axios';

const SET_STUDENTS = 'SET_STUDENTS'
const CREATE_STUDENT = 'CREATE_STUDENT'
const DESTROY_STUDENT = 'DESTROY_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const UNREGISTER_STUDENT = 'UNREGISTER_STUDENT'
//these actions should all be in students

const setStudents = (students) => {
  return {
    type: SET_STUDENTS,
    students
  }
}

const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student
  }
}

const _destroyStudent = (student) => {
  return {
    type: DESTROY_STUDENT,
    student
  }
}

const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student
  }
}

const _unregisterStudent = (student) => {
  return {
    type: UNREGISTER_STUDENT,
    student
  }
}


export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/students')
      dispatch(setStudents(data))
    } catch(err) {
      console.log(err)
    }
  }
}

export const createStudent  = (student, history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/students', student)
      dispatch(_createStudent (data))
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateStudent  = (student, history) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/students/${student.id*1}`, student).data
      dispatch(_updateStudent (data));
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
}

export const destroyStudent = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/students/${id}`);
      dispatch(_destroyStudent ({id: id*1}))
     // history.push('/') // no need 
    } catch (err) {
      console.log(err)
    }
  }
}

export const unregisterStudent = (id, history) =>{
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/students/${id*1}`, student).data
      dispatch(_unregisterStudent (data));
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }
}


const initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_STUDENTS:
      return action.students
    case CREATE_STUDENT:
      return [...state, action.student];


    case UPDATE_STUDENT:
      return state.map((student) =>
        student.id === action.student.id ? action.student : student
        );

    case DESTROY_STUDENT:
      return state.filter(student=> student.id !== action.student.id);
      
    case UNREGISTER_STUDENT:
      return state.map((student) =>
        student.id === action.student.id ? action.student : student
        );
    default:
      return state
  }
}
