import React, {Component} from 'react';
import {connect} from "react-redux";
import {destroyCampus} from '../store/campuses' 

class DeleteCampus extends Component{

 render(){
    const { destroy, campusId } = this.props;
    return (
      <div>
        <button onClick={ () => destroy(campusId)}>X</button>
      </div>
    ); 
  }
}

const mapDispatchToProps = (dispatch, otherProps)=> {
  return {
    destroy: (campusId)=> {
      dispatch(destroyCampus(campusId, otherProps.history )); //otherProps.match.params.Id*1
    }
  };
};

export default connect(null, mapDispatchToProps)(DeleteCampus);
