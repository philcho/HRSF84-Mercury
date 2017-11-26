import React from 'react';
import axios from 'axios';

import * as d3 from 'd3';

export default class Superlative extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'superlativeData': {},
      'nominees': [], // this is the list of people to vote for
      // nominees's data is from the list of students
      'chartData': [] // this is the data for the d3 chart
    }
  }

  componentDidMount() {
    this.getStudents();
    this.getSuperlativeData();
  }

  generateChart() {
    // removes any previous instance of a chart
    // this lets it update when a new vote is made
    var myNode = document.getElementsByClassName("chart")[0];
    myNode.innerHTML = '';

    // d3 code
    d3.select('.chart')
      .selectAll('div')
      .data(this.state.chartData)
      .enter()
      .append('div')
      .style('width', (student, index, collection) => { return (student.votes * 50) + 'px'; })
      .style('background-color', () => { return 'blue'; })
      .style('border', () => { return '1px solid black'; })
      .style('margin', () => { return '5px 0px'; })
      .insert('span')
      .text((student, index, collection) => { return student.name + ': ' + student.votes; });
  }

  getSuperlativeData() {
    // This function uses the current URL
    // Example URL: http://localhost:3000/superlative/Best%20Socks

    // get the superlative id and undo the url encoding
    const superlativeName = decodeURIComponent(window.location.href.split('/superlative/')[1]);

    axios.post('/getParticular', {
      'modelType': 'superlative',
      'identifier': {
        'superlative': superlativeName
      }
    })
      .then((response) => {
        if (response.data[0]) {
          this.setState({
            superlativeData: response.data[0],
            chartData: response.data[0].nominees.map((nominee, index, collection) => {
              return { 'name': nominee.name, 'votes': nominee.votes };
            })
          });
          this.generateChart(); // update the Chart with the new data
        }
      })
      .catch((error) => {
        console.log('getSuperlativeData error', error);
      });
  }

  getStudents() {
    axios.get('/getAllStudents')
      .then((students) => {
        this.setState({
          'nominees': students.data.map((student, index, collection) => {
            return student.name;
          })
        });
      });
  }

  getLeaders() {
    if (this.state.chartData.length < 1) {
      return (
        <h3>
          No votes in yet. Be the first!
        </h3>
      );
    } else {
      // get the top 3 and display them
      <h3>
        People have voted, so figure out the leader(s) here!
      </h3>
    }
  }

  handleVote(event) {
    event.preventDefault();
    // TODO: Show something that tells the user they voted

    // handle the vote here
    const person = document.getElementById('input').value;

    if (this.state.nominees.indexOf(person) > -1) {
      axios.patch('/updateVoteCount', {
        'identifier': {
          '_id': this.state.superlativeData._id
        },
        'nomineeName': person
      })
        .then(() => { // update the data
          this.getSuperlativeData();
        })
        .catch((error) => {
          console.log('Error in updating the vote:', error);
        });
    } else {
      console.log('It is NOT a valid name... so tell the user');
    }
  }

  render() {
    const inputStyle = {
      'border': '1px solid black',
      'padding': '5px',
      'margin': '5px'
    };

    return (
      <div className="superlative list-item container column">
        <div className="list-item-name superlative-name">{this.state.superlativeData.superlative}</div>
        <img className="list-item-img superlative-img" src={this.state.superlativeData.img} />

        <form onSubmit={(event) => { this.handleVote(event) }} >
          <input id='input' list="superlatives" style={inputStyle} name="superlativeChoice" placeholder="Who will you vote for? " />

          <datalist id="chosenSuperlative">
            {this.state.nominees.map((studentName, index, collection) => {
              return (<option value={studentName} key={index} />);
            })}
          </datalist>

          <button>Vote!</button>
        </form>
        <br />
        <p>Leaderboard here</p>
        <div className='chart'></div>
      </div>
    );
  }
}
