import React, {Component} from 'react';
import { connect } from "react-redux";
import { fetchCampuses } from '../store/campuses';
import {createStudent} from '../store/students'
 
//Form
class CreateStudent extends Component {
    constructor (){
        super();
        this.state = {
          firstName: '',
          lastName: '',
          email:'',
          gpa:0.00,
          campusId:''    
        } //an example
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(ev){
        ev.preventDefault(); 
        const newStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            gpa: this.state.gpa
        }
        this.props.create(newStudent) 
    }

    onChange(ev){
        this.setState({...this.state, [ev.target.name]: ev.target.value});
    }
    render(){
        const { onSubmit, onChange } = this;
        const { firstName, lastName, email, gpa} = this.state;
        const campuses = this.props.campuses
        return (
          <form onSubmit={ onSubmit }>
            <input className="input" type="text"  placeholder = 'First Name' onChange={ onChange } name='firstName' value = {firstName} />  
            <input className="input" type="text" placeholder='Last Name' onChange={ onChange } name='lastName' value={ lastName }/>
            <input className="input" type="text" placeholder='Email' onChange={ onChange } name='email' value={ email }/>
            <input className="input" type="number" step='0.01' placeholder='GPA' onChange={ onChange } name='gpa' value={ gpa }/>
            <select>
                <option value='' >--Choose--</option>
                {campuses.map(campus => <option key={campus.id} name='campus' value={campus.id}>{campus.name}</option>)}
            </select>
            <button disabled={ !firstName || !lastName }>Create</button>
          </form>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
      //this is not this.state on line 9
      campuses:state.campuses,
      student:state.student //must be here to create the student
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
    loadCampuses: () => dispatch(fetchCampuses()),
    create: (student)=> {  //create
        dispatch(createStudent(student,history));
      }
    }
  }
  
   
 export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)