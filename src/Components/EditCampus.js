import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateCampus} from '../store/campuses' 

class EditCampus extends Component{
  constructor(){
    super();
    this.state = {
      name:'',
      address:''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate(prevProps){
    if(!prevProps.campus.id && this.props.campus.id){
      this.setState({
        id:this.props.campusId,
        name:this.props.campus.name,
        address: this.props.campus.address
      })
    }
  }

  async componentDidMount(){
    if(this.props.campus.id){
      this.setState({
        id:this.props.campus.id,
        name:this.props.campus.name,
        address:this.props.campus.address
      })
    }
  }

  onSubmit(ev){
    ev.preventDefault(); 
    this.props.update(this.props.campusId, this.state.name,this.state.address)  
  }

  onChange(ev){
    this.setState({...this.state, [ev.target.name]: ev.target.value});
    }

 render(){
    const { name, address } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <div>
        <form id='update-campus-form' onSubmit={onSubmit}>
              <input placeholder = 'name' onChange={ onChange }  name='name' value = {name} />  
              <input placeholder='address' onChange={ onChange } name='address' value={ address }/>
          <button type='update'>Update</button>
        </form>
      </div>
    ); 
  }
}

const mapStateToProps = (state,{match})=> {
  const id = match.params.Id*1; 
  const campus = state.campuses.find( campus => campus.id === id) || {};  
  return { campus };
};

const mapDispatchToProps = (dispatch, {history})=> {
  return {
    update: (id, name,address)=> {
      dispatch(updateCampus({id, name, address}, history)); //or use: id: match.params.Id*1
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCampus);
