import React, {Component} from 'react';
import {connect} from "react-redux";
import {unregisterStudent} from '../store/students' 

class Unregister extends Component{
  constructor(){
    super();
    this.state = {
         firstName: '',
         lastName: '',
         email:'',
         gpa:0.00,
         campusId:''    
        }
        this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(ev){
    ev.preventDefault(); 
    const newStudent = {
      firstName:this.state.student.firstName,
      lastName: this.state.student.lastName,
      email:this.state.student.email,
      gpa:this.state.student.gpa,
      campusId:null, //unregister
      }
    this.props.unregister(newStudent)
  }

  componentDidUpdate(prevProps){
    if(!prevProps.student.id && this.props.student.id){
      this.setState({
        student:
        {firstName:this.props.student.firstName,
        lastName: this.props.student.lastName,
        email:this.props.student.email,
        gpa:this.props.student.gpa,
        campusId:this.props.student.campusId
        }
      })
    }
  }

  async componentDidMount(){
    if(this.props.student.id){
      this.setState({
        student:{
        firstName:this.props.student.firstName,
        lastName: this.props.student.lastName,
        email:this.props.student.email,
        gpa:this.props.student.gpa,
        campusId:this.props.student.campusId
        }
      })
    }
  }

 render(){
    const { onClick } = this;
    return (
      <div>
        <button onSubmit={onClick}>unregister</button>
      </div>
    ); 
  }
}

const mapStateToProps = (state, { match })=> {
  const id = match.params.id*1; //turn it into a number 
  const student = state.students.find( student =>  student.id === id) || {};
  return { student };
};

const mapDispatchToProps = (dispatch, otherProps)=> {
  return {
    unregister: ()=> {
      dispatch(unregisterStudent(otherProps.match.params.id*1, otherProps.history ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Unregister);


