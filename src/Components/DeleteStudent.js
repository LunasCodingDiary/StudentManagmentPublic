import React, {Component} from 'react';
import {connect} from "react-redux";
import {destroyStudent} from '../store/students' 

class DeleteStudent extends Component{
  // constructor(){ //you are not constructing anything. 
  //   super();
  //   this.state = {
  //        firstName: '',
  //        lastName: '',
  //        email:'',
  //        gpa:0.00,
  //        campusId:''    
  //       }
  // }

 render(){
    const { destroy, studentId } = this.props;
    return (
      <div>
        <button onClick={()=> destroy(studentId)}>X</button>
      </div>
    ); 
  }
}

// const mapStateToProps = (state, { match})=> {
//   const id = match.params.id*1; //turn it into a number 
//   const student = state.students.find( student =>  student.id === id) || {};
//   return { student };
// };

const mapDispatchToProps = (dispatch, otherProps)=> {
  return {
    destroy: (studentId)=> {
      dispatch(destroyStudent(studentId, otherProps.history ));
    }
  };
};

export default connect(null, mapDispatchToProps)(DeleteStudent);


 