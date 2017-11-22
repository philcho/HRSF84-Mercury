import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';
import CommentForm from './CommentForm.jsx';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: {}
    }
  }

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData() {
    // Example URL: http://localhost:3000/profile/5a0ddac3b218d0cadf73eefb
    let studentId = window.location.href.split('/profile/')[1];

    axios.post('/getParticularStudent', {
      studentInfo: {
        _id: studentId
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

  render() {
    return (
      <div className="profile container column">
        <Nav/>

        <div className="profile-info container column">
          <div className="profile-picture">{this.state.profileData.picture}</div>

          <div className="container column">
            <div className="profile-name">{this.state.profileData.name}</div>
            <div className="profile-bio">{this.state.profileData.bio}</div>
          </div>
        </div>

        <CommentForm/>

        <div className="container column">
          <div className="profile-comment">This is an example of a comment.</div>
        </div>
      </div>
    );
  }
}
