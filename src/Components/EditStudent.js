import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateStudent} from '../store/students' ;
import {fetchCampuses} from '../store/campuses'

class EditStudent extends Component{
  constructor(){
    super();
    this.state = {
         campuses:[],
         student:{firstName: '',
         lastName: '',
         email:'',
         gpa:0.00,
         campusId:''
         }    
        } 
     
     this.onSubmit = this.onSubmit.bind(this)
     this.onChange = this.onChange.bind(this)
  }

  //update
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

  async componentDidMount(){ //?
    await this.props.loadCampuses() 
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

  onSubmit(ev){
    ev.preventDefault(); 
    const newStudent = {
      firstName:this.state.student.firstName,
      lastName: this.state.student.lastName,
      email:this.state.student.email,
      gpa:this.state.student.gpa,
      campusId:this.state.student.campusId,
      }
    this.props.update(newStudent)
  }

  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value});
    }

 render(){
    const {firstName, lastName, email, gpa, campusId} = this.state
    const campuses = this.props.campuses
    const { onSubmit, onChange } = this;
    return (
      <div>
        <form id='update-student-form' onSubmit={onSubmit}>
            <input className="input" type="text"  placeholder = 'First Name' onChange={ onChange } name='firstName' value = {firstName} />  
            <input className="input" type="text" placeholder='Last Name' onChange={ onChange } name='lastName' value={ lastName }/>
            <input className="input" type="text" placeholder='Email' onChange={ onChange } name='email' value={ email }/>
            <input className="input" type="number" placeholder='GPA' step='0.01' onChange={ onChange } name='gpa' value={ gpa }/>
               <select>
                   <option value=''>--Choose--</option>
                   {campuses.map(campus => <option name='campus' value={campusId}>{campus.name}</option>)}
               </select>
          <button type='update'>Update</button>
        </form>
      </div>
    ); 
  }
}

const mapStateToProps = (state, { match })=> {
  const id = match.params.Id*1; 
  const campuses = state.campuses
  const student = state.students.find( student =>  student.id === id) || {};
  return { campuses, student }; 
}

const mapDispatchToProps = (dispatch, { history})=> {
  return {
    loadCampuses: () => dispatch(fetchCampuses()),
    update: (id, firstName, lastName, email, gpa, campusId)=> {
      dispatch(updateStudent({id, firstName, lastName, email, gpa,campusId }, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStudent);


 