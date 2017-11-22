import React from 'react';
import axios from 'axios';

export default class Superlative extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      superlativeData: {},
      studentList: []
    }

    // axios request to get a list of the students
    axios.get('/getAllStudents')
      .then((response) => {
        this.setState({
          'studentList': response.data.map((student, index, collection) => {
            return student.name;
          })
        });
      })
      .then(() => {
        console.log('students: ', JSON.stringify(this.state.studentList, undefined, 2));
      });
  }

  componentDidMount() {
    this.getSuperlativeData();
  }

  getSuperlativeData() {
    // Example URL: http://localhost:3000/superlative/Most%20Likely%20To%20Be%20An%20Axe%20Murder

    // get the superlative name and undo the url encoding
    const superlativeName = decodeURIComponent(window.location.href.split('/superlative/')[1]);

    axios.post('/getParticularSuperlative', {
      'superlativeInfo': {
        'superlative': superlativeName
      }
    })
      .then((response) => {
        if (response.data[0]) {
          this.setState({ superlativeData: response.data[0] });
        }
      })
      .catch((error) => {
        console.log('getSuperlativeData error', error);
      });
  }

  handleVote(event) {
    event.preventDefault();

    // handle the vote here
    const person = document.getElementById('input').value;
    console.log(JSON.stringify(person, undefined, 2));

    if (this.state.studentList.indexOf(person) > -1) {
      console.log('It is a valid name, so increment the vote count');
    } else {
      console.log('It is NOT a valid name... so do nothing?');
    }
  }

  render() {
    const inputStyle = {
      'border': '1px solid black',
      'padding': '5px',
      'margin': '5px'
    };

    return (
      <div className="student list-item container column">
        <div className="list-item-name student-name">{this.state.superlativeData.superlative}</div>
        <img className="list-item-img student-img" src={this.state.superlativeData.img} />

        <form onSubmit={(event) => { this.handleVote(event) }} >
          <label>
            <input id='input' list="superlatives" style={inputStyle} name="superlativeChoice" placeholder="Who will you vote for? " /></label>
          <datalist id="chosenSuperlative">
            {this.state.studentList.map((studentName, index, collection) => {
              return (<option value={studentName} key={index} />);
            })}
          </datalist>
          <button>Vote!</button>
        </form>
        <br />
        <p>Leaderboard here</p>
      </div>
    )
  }
}

