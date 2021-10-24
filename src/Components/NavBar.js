import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = ({studentsCount, campusesCount}) => {
  return (
    <div id="navbar" className='row'>
      <Link to='/students'>Students({ studentsCount }) </Link> 
      <Link to='/campuses'>Campuses({ campusesCount }) </Link>
    </div>
  );
};


const mapStateToProps = (state)=> {
  return {
    studentsCount: state.students.length,
    campusesCount: state.campuses.length
  };
};

export default connect(mapStateToProps)(NavBar);
