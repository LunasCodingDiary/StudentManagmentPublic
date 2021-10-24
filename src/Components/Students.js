import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CreateStudent from './CreateStudent';
import {fetchCampuses} from '../store/campuses';
import {fetchStudents} from '../store/students';
import DeleteStudent from './DeleteStudent';

const Students = (props) => {
   const students = props.students 
   console.log(students)
   const campuses = props.campuses
   return (
    <div>
        <div id='students' className = 'column'>
        {   students.map(student=>{
            const campus = campuses.find(campus=>campus.id===student.campusId || {})  // if you cannot find anything  
            return(      
            <div className='student' key={student.id||'0'}>
                <Link to={`/students/${student.id||''}`}>{student.firstName} {student.lastName} </Link> 
                {campus.id? (
                    <span>
                      attends
                      <Link to={`/campuses/${student.campusId}`}>{campus.name}</Link> 
                    </span>): (<span>"No Campus"</span>)}
            <DeleteStudent studentId={student.id} history={props.history} />
              <hr /> 
            </div>
            )
        } 
        )}
        </div>
        <CreateStudent />
        <hr />
    </div>
    )
}

const mapStateToProps = (state)=>{
    return {
      students: state.students,
      campuses:state.campuses
    }
}
//take the global state and map it to the props (of a component)
// local state -- only the class component has it
//The store only has state and the ability to change it ; the otherProps are of the component 

const mapDispatchToProps = (dispatch, {history})=>{
    return {
    loadCampuses: () => dispatch(fetchCampuses()), 
    loadStudents: () => dispatch(fetchStudents()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);
