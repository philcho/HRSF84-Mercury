import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';
import Comments from './Comments.jsx';
import CommentForm from './CommentForm.jsx';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: window.location.href.split('/event/')[1],
      eventDetailsData: {
        comments: []
      },
      commentName: '',
      commentText: ''
    }
  }

  componentDidMount() {
    this.getEventDetailsData();
  }

  getEventDetailsData() {
    // Example URL: http://localhost:3000/event/5a0ddac3b218d0cadf73eefb
    axios.post('/getParticular', {
      'modelType': 'event',
      'identifier': {
        _id: this.state.eventId
      }
    })
      .then((response) => {
        if (response.data[0]) {
          this.setState({ eventDetailsData: response.data[0] });
        }
      })
      .catch((error) => {
        console.log('getEventDetailsData error', error);
      });
  }

  onSubmitComment(event) {
    event.preventDefault();

    axios.patch('/updateComments', {
      modelType: 'event',
      identifier: {
        _id: this.state.eventId
      },
      comment: {
        name: this.state.commentName,
        comment: this.state.commentText
      }
    })
      .then((response) => {
        this.getEventDetailsData();
      })
      .catch((error) => {
        console.log('onSubmitComment error', error);
      });
  }

  onChangeCommentName(event) {
    this.setState({ commentName: event.target.value });
  }

  onChangeCommentText(event) {
    this.setState({ commentText: event.target.value });
  }

  render() {
    return (
      <div className="event-details container column">
        <Nav />

        <div className="event-details-info container column">
          <img className="event-img" src={this.state.eventDetailsData.picture} />

          <div className="container column">
            <div className="event-name title-page">{this.state.eventDetailsData.name}</div>
            <div className="event-date">{this.state.eventDetailsData.date}</div>
            <div className="event-bio">{this.state.eventDetailsData.description}</div>
          </div>
        </div>

        <CommentForm
          onSubmit={this.onSubmitComment.bind(this)}
          onChangeName={this.onChangeCommentName.bind(this)}
          onChangeText={this.onChangeCommentText.bind(this)}
          name={this.state.commentName}
          text={this.state.commentText}
        />

        <Comments comments={this.state.eventDetailsData.comments} />
      </div>
    );
  }
};
