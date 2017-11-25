import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';
import CommentForm from './CommentForm.jsx';
import Comments from './Comments.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: window.location.href.split('/profile/')[1],
      profileData: {
        comments: []
      },
      commentName: '',
      commentText: ''
    }
  }

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData() {
    axios.post('/getParticularStudent', {
      studentInfo: {
        _id: this.state.studentId
      }
    })
      .then((response) => {
        if (response.data[0]) {
          this.setState({ profileData: response.data[0] });
        }
      })
      .catch((error) => {
        console.log('getProfileData error', error);
      });
  }

  onSubmitComment(event) {
    event.preventDefault();

    axios.patch('/updateComments', {
      modelType: 'student',
      identifier: {
        _id: this.state.studentId
      },
      comment: {
        name: this.state.commentName,
        comment: this.state.commentText
      }
    })
      .then((response) => {
        this.getProfileData();
      })
      .catch((error) => {
        console.log('onSubmitComment error', error);
      });
  }

  onChangeCommentName(event) {
    this.setState({commentName: event.target.value});
  }

  onChangeCommentText(event) {
    this.setState({commentText: event.target.value});
  }

  render() {
    return (
      <div className="profile container column">
        <Nav />

        <div className="profile-info container column">
          <img className="profile-picture" src={this.state.profileData.picture}/>

          <div className="container column">
            <div className="profile-name">{this.state.profileData.name}</div>
            <div className="profile-bio">{this.state.profileData.bio}</div>
          </div>
        </div>

        <CommentForm
          onSubmit={this.onSubmitComment.bind(this)}
          onChangeName={this.onChangeCommentName.bind(this)}
          onChangeText={this.onChangeCommentText.bind(this)}
          name={this.state.commentName}
          text={this.state.commentText}
        />

        <Comments comments={this.state.profileData.comments} />
      </div>
    );
  }
}
