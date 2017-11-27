import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';
import CommentForm from './CommentForm.jsx';
import Shoutout from './Shoutout.jsx';

export default class Shoutouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoutouts: [],
      shoutoutCategory: '',
      shoutoutText: '',
      shoutoutName: ''
    };
  }

  componentDidMount() {
    this.getAllShoutouts();
  }

  getAllShoutouts() {
    axios.get('/getAllShoutouts')
      .then((response) => {
        this.setState({ shoutouts: response.data });
      })
      .catch((error) => {
        console.log(`----- getAllEvents error : ${error} -----`);
      });
  }

  onSubmitShoutout(event) {
    event.preventDefault();

    axios.post('/add', {
      modelType: 'shoutout',
      data: {
        category: this.state.shoutoutCategory,
        text: this.state.shoutoutText,
        name: this.state.shoutoutName
      }
    })
      .then((response) => {
        this.getAllShoutouts();
      })
      .catch((error) => {
        console.log('onSubmitComment error', error);
      });
  }

  onChangeShoutoutName(event) {
    this.setState({ shoutoutName: event.target.value });
  }

  onChangeShoutoutText(event) {
    this.setState({ shoutoutText: event.target.value });
  }

  onChangeShoutoutCategory(event) {
    this.setState({ shoutoutCategory: event.target.value });
  }

  render() {
    return (
      <div className="shoutouts container column">
        <Nav/>
        <div className="title-page">Shoutouts</div>
        <CommentForm
          onSubmit={this.onSubmitShoutout.bind(this)}
          onChangeName={this.onChangeShoutoutName.bind(this)}
          onChangeText={this.onChangeShoutoutText.bind(this)}
          onChangeCategory={this.onChangeShoutoutCategory.bind(this)}
          name={this.state.shoutoutName}
          text={this.state.shoutoutText}
          category={this.state.shoutoutCategory}
        />

        <div className='shoutouts-box container row'>
          {this.state.shoutouts.map((shoutout, index) => {
            return (
              <Shoutout shoutout={shoutout} key={shoutout._id}/>
            );
          })}
        </div>
      </div>
    );
  }
}
