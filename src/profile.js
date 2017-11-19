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
    axios.post('/getParticularStudent', {
      studentInfo: {
        _id: '5a0ddac3b218d0cadf73eefb'
      }
    })
    .then(function (response) {
      this.setState({ profileData: response.data[0] });
    }.bind(this))
    .catch(function (error) {
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
              {/* TODO: Build Comments Component */}
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