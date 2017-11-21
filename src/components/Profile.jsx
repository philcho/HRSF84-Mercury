import React from 'react';
import axios from 'axios';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: {}
    }
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
      <div>
        <ul>
          <li>name: {this.state.profileData.name}</li>
          <li>picture: {this.state.profileData.picture}</li>
          <li>bio: {this.state.profileData.bio}</li>
          <li>comments:
            <ol>
              {/* TODO: Add Comments Component */}
            </ol>
          </li>
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.getProfileData();
  }
}
