import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchCampuses} from '../store/campuses';
import CreateCampus from './CreateCampus';
import {updateCampus} from '../store/campuses';
import DeleteCampus from './DeleteCampus';
import student from '../store/student';

//Campus
const Campuses = (props) =>{
    const campuses = props.campuses
    const students = props.students
    return (
    <div>
      <div>
        {
         campuses.map(campus => {
          const campusStudents =students.find(student=>student.campusId===campus.id)||[];
          (
          <span key={campus.id}>
            <Link to={`/campuses/${campus.id}`} >
              <div className='campus row'>
                <img src={campus.imageUrl} />
                <p>{campus.name}({campusStudents ? campusStudents.length : 0 })</p>
              </div>
            </Link>
            <DeleteCampus campusId={campus.id} history={props.history} />
            </span>
          )})
        }
      </div>
      <CreateCampus match={props.match} history={props.history} key={campuses.length+1} />
      <hr />
    </div>
    )
  }
  //only use this when it is a class
  
const mapStateToProps = (state) => {
   return {
       campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
   loadCampuses: () => dispatch(fetchCampuses()),
  
   toggle: (id)=> { //edit
    dispatch(updateCampus(id));
   },
   }
 }

  
export default connect(mapStateToProps, mapDispatchToProps)(Campuses)