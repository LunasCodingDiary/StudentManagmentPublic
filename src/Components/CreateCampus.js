import React, {Component} from 'react';
import {createCampus} from '../store/campuses';
import {connect} from 'react-redux';

//Form
class CreateCampus extends Component { //map in Campuses
    constructor (){
        super();
        this.state = {
          name: '',
          address: ''
        } 
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(ev){
        ev.preventDefault(); 
        this.props.create({...this.state})
    }

    onChange(ev){
        this.setState({...this.state,[ev.target.name]: ev.target.value});
    }
    render(){
        const { onSubmit, onChange } = this;
        const { name, address } = this.state;
        return (
        <div>
          <form onSubmit={ onSubmit }>
            <input className="input" type="text" placeholder = 'name' onChange={ onChange }  name='name' value = {name} />
            <input className="input" type="text" placeholder='address' onChange={ onChange } name='address'  value={address} />
            <button type='submit' disabled={ !name || !address}>Create</button>
          </form>
        </div> 
        );
    }
}

// const mapStateToProps = (state) => {
//   return { 
//     campuses:state.campuses,
//     //campus:state.campus
//     } 
// };

const mapDispatchToProps = (dispatch, { history }) => ({
  create: (campus) => dispatch(createCampus(campus, history))
});

export default connect(null, mapDispatchToProps)(CreateCampus);
