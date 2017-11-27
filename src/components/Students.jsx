import React from 'react';
import Nav from './Nav.jsx';
import axios from 'axios';
import Student from './Student.jsx'

export default class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsData: []
    };
  }

  getStudentsData() {
    axios.get('/getAllStudents')
      .then((response) => {
        this.setState({ studentsData: response.data });
      })
      .catch((error) => {
        console.log('getStudentsData error', error);
      });
  }

  componentDidMount() {
    this.getStudentsData();
  }

  render() {
    return (
      <div>
        <Nav/>

        <div className='students container column'>
          <div className='title-page'>STUDENTS</div>

          <div className='container row'>
            {this.state.studentsData.map((student, index, collection) => {
              return (<Student studentData={student} key={student._id} />);
            })}
          </div>

        </div>
      </div>
    );
  }
}
