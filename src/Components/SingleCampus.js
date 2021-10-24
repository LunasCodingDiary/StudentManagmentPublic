import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {fetchCampus} from '../store/campus';
import EditCampus from './EditCampus';
import Unregister from './Unregister'


class SingleCampus extends Component {

  componentDidMount () {
    try {
      const campusId = this.props.match.params.Id  //align with Main.js
      this.props.loadSingleCampus(campusId)
    }
    catch (error) {
      console.error(error)
    }
  }

  render () { 
    const campus = this.props.campus
    if (!this.props.campus.students) return null
    const students = this.props.campus.students    //campus.students (after using include)
    return (
      <div id='single-campus'>
        <div id='single-campus-detail' className='row'>
          <div>
            <h1 key={campus.name}>Detail Page for {campus.name}</h1>
            <h3 key={campus.addresse}>{campus.address}</h3>
            <p key={campus.description}>{campus.description}</p>
          </div>
          <img src={campus.imageUrl} />
        </div>
        <div id='single-campus-nav'>
          <h3>Enrollees:</h3>
          <ul>
          {students.map(student=> {
              return(
              <li key={student.id}><Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> <Unregister  match={this.props.match} history={this.props.history}  /> </li>
              )
              })}
          </ul>
        </div>
        <EditCampus campusId= {campus.id} match={this.props.match} history={this.props.history} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campus: state.campus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleCampus: (campusId) => dispatch(fetchCampus(campusId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
