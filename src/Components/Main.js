import React from 'react'
import Navbar from './Navbar'
import {HashRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux';
//Components
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import Students from './Students';
import SingleStudent from './SingleStudent';

//thunk actions 
import {fetchCampuses} from '../store/campuses';
import {fetchStudents} from '../store/students'

class Main extends React.Component {
  componentDidMount() {
    this.props.loadCampuses()
    this.props.loadStudents()
  }

  //Router 
  render () {
    return (
      <Router>
      <div id='main'>
        <div>
          <Navbar />
        </div>
        <Route path = '/students' component = {Students}  />
        <Route path = '/campuses' component = {Campuses}  />
        <Route path = '/students/:Id' component = {SingleStudent}  />
        <Route path = '/campuses/:Id' component = {SingleCampus}  />
        <Route path='/' component={Campuses} exact />
      </div>
     </Router>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
      loadStudents: () => dispatch(fetchStudents()),
      loadCampuses: () => dispatch(fetchCampuses())
    }
}
//export default Main
export default connect(null, mapDispatchToProps)(Main)
