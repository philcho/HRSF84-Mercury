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
    if (this.state.chartData.length < 1) { // no votes in yet
      d3.select('.chart')
        .append('h1')
        .text(() => { return 'No votes in yet... So be the first!'; });
      return undefined; // don't execute the below code if there is no data
    }

    const childrenCount = document.getElementsByClassName("chart")[0].childElementCount;

    if (childrenCount < 1) { // create a new chart
      d3.select('.chart')
        .selectAll('div')
        .data(this.state.chartData)
        .enter()
        .append('div')
        .style('background-color', () => { return 'blue'; })
        .style('border', () => { return '1px solid black'; })
        .style('margin', () => { return '5px 0px'; })
        .transition()
        .duration(1500)
        // delay causes the transition to appear more organic
        .delay(function (element, index, collection) {
          return index * 500;
        })
        .ease(d3.easeLinear)
        .style('width', (student, index, collection) => { return (student.votes * 20) + 'px'; });

      // This has to be in a seperate code block, otherwise it will throw an 'is not a function' error
      d3.select('.chart')
        .selectAll('div')
        .insert('span')
        .text((student, index, collection) => { return student.name + ': ' + student.votes; });
    } else { // update an existing chart
      // bind the new data
      let thing = d3.select('.chart').selectAll('div')
        .data(this.state.chartData);

      // extend a bar
      thing.enter().append('div')
        .style('background-color', () => { return 'blue'; })
        .style('border', () => { return '1px solid black'; })
        .style('margin', () => { return '5px 0px'; })
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style('width', (student, index, collection) => { return (student.votes * 20) + 'px'; });

      // apply the visual change (extend the bar)
      thing
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style('width', (student, index, collection) => { return (student.votes * 20) + 'px'; });

      // remove then add spans in case if a new student was nominated
      // removes all old spans
      d3.select('.chart')
        .selectAll('div')
        .select('span')
        .remove();

      // update the text
      d3.select('.chart')
        .selectAll('div')
        .insert('span')
        .text((student, index, collection) => { return student.name + ': ' + student.votes; });
    }

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
          <input id='input' list="chosenSuperlative" style={inputStyle} name="superlativeChoice" placeholder="Who will you vote for? " />

          <datalist id="chosenSuperlative">
            {this.state.nominees.map((studentName, index, collection) => {
              return (<option value={studentName} key={index} />);
            })}
          </datalist>

          <button>Vote!</button>
        </form>
        <br />
        <div className='chart'></div>
      </div>
    );
  }
}
