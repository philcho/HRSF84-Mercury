import React from 'react';
import axios from 'axios';

import * as d3 from 'd3';

export default class Superlative extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'superlativeData': {
      },
      'nominees': [] // this is the list of people to vote for
      // this is in addition to the superlativeData.nominees, because this is only the names, not complex objects
    }
  }

  componentDidMount() {
    this.getSuperlativeData();
  }

  getSuperlativeData() {
    // Example URL: http://localhost:3000/superlative/Most%20Likely%20To%20Be%20An%20Axe%20Murder

    // get the superlative id and undo the url encoding
    const superlativeName = decodeURIComponent(window.location.href.split('/superlative/')[1]);

    axios.post('/getParticularSuperlative', {
      superlativeInfo: {
        _id: superlativeName
      }
    })
      .then((response) => {
        if (response.data[0]) {
          console.log('data', response.data[0]);
          this.setState({
            superlativeData: response.data[0],
            nominees: response.data[0].nominees.map((nominee, index, collection) => {
              return nominee.name;
            })
          });
        }
      })
      .catch((error) => {
        console.log('getSuperlativeData error', error);
      });
  }

  getLeaders() {
    if (this.state.superlativeData.nominees.length < 1) {
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
        .then((response) => {
          // update the superlativeData
          // This is a decent enough place to update, in case if someone else voted since the user loaded this page
          this.setState({ 'superlativeData': response.data });
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
        <div className="list-item-name superative-name">{this.state.superlativeData.superlative}</div>
        <img className="list-item-img superative-img" src={this.state.superlativeData.img} />

        <form onSubmit={(event) => { this.handleVote(event) }} >
          <input id='input' list="superlatives" style={inputStyle} name="superlativeChoice" placeholder="Who will you vote for? " />

          <datalist id="chosenSuperlative">
            {this.state.nominees.map((studentName, index, collection) => {
              return (<option value={studentName} key={index} />);
            })}
          </datalist>

          <button>Vote!</button>
        </form>

        <div>Leaderboard here</div>
      </div>
    );
  }
}
