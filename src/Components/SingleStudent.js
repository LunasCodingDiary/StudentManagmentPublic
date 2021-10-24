import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStudent } from '../store/student';
import EditStudent from './EditStudent';

class SingleStudent extends Component {

  componentDidMount () {
    try {
      const studentId = this.props.match.params.Id 
      this.props.loadSingleStudent(studentId)
    }
    catch (error) {
      console.error(error)
    }
  }

  render () {
    const student = this.props.student
    if (!this.props.student.firstName) return null //necessary
    return (
      <div>
      <div id='single-student' className='column'>
        <h1>Detail Page for {student.firstName}</h1>
        <p>{student.firstName} - <Link to={`/campuses/${student.campusId}`} key={student.campusId}> Attends {!!student.campus? student.campus.name :'' }</Link> </p>
        <img src={student.imageUrl} />
        <ul>
            <li key={student.firstName, student.lastName}>Full Name: {student.firstName} {student.lastName} </li>
            <li key={student.email} >Email: {student.email} </li>
            <li key={student.gpa} >GPA: {student.gpa} </li>
        </ul>
      </div>
      <EditStudent studentId= {student.id} history={this.props.history} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleStudent: (id) => dispatch(fetchStudent(id))
    // toggle: (id, history)=> { //edit
    //   dispatch(updateStudent(id, history));
      // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent)