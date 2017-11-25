import React from 'react';
import Nav from './Nav.jsx';
import Superlative from './Superlative.jsx'

export default class Superlatives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      superlatives: []
    };
  }

  getAllSuperlatives() {
    axios.get('/getAllSuperlatives')
      .then((response) => {
        this.setState({ superlatives: response.data });
      })
      .catch((error) => {
        console.log(`----- getAllEvents error : ${error} -----`);
      });
  }

  componentDidMount() {
    this.getAllSuperlatives();
  }

  render() {
    return (
      <div>
        <Nav />

        <div className="students list container column">
          <h1>Superlatives</h1>

          <div className="container row">
            {this.state.superlatives.map((superlative, index) => {
              return (
                <Superlative superlative={superlative} key={superative._id}/>
              );
            })}
          </div>
        </div>
      </div>

    );
  }
}
