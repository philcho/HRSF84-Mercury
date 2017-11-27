import React from 'react';
import axios from 'axios';
import Nav from './Nav.jsx';

export default class AddSuperlative extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      superlative: '', // Ex. 'Best Socks'
      img: '' // url for the image
    }
  }

  onSuperlativeChange() {
    this.setState({ 'superlative': document.getElementById('superlativeName').value });
  }

  onImgChange() {
    this.setState({ 'img': document.getElementById('imgUrl').value });
  }

  onSubmitSuperlative(event) {
    event.preventDefault();

    // TODO: put in borders for a user friendly method of error handling
    // remove the input borders

    let allFieldsValid = true;
    if (this.state.superlative.length < 1) {
      console.log('ERROR! You Need A Superlative!')
      // set the superlative input field to have a red border
      allFieldsValid = false;
    }

    if (this.state.img.length < 1) {
      console.log('ERROR! You Need An Image!')
      // set the image input field to have a red border
      allFieldsValid = false;

      // TODO: If there is no supplied image, then use the unsplash API to get an image
      // use the superlative as the query string
      // add in an extra step to let the user preview the unsplash image
    }

    if (!allFieldsValid) {
      return undefined; // don't proceed further, there is at least 1 invalid field
    }

    // add the superlative to the database
    axios.post('/add', {
      'modelType': 'superlative',
      'data': {
        'superlative': this.state.superlative,
        'img': this.state.img
      }
    })
      .then((response) => {
        console.log('You have successfully added a superlative!');
      })
      .catch((e) => {
        console.log('Error in: \'onSubmitSuperlative\':\n', e);
      });
  }

  render() {
    return (
      <div className="container column">
        <Nav />

        <h1 className="superlative-label" >Add A New Superlative!</h1>
        <form onSubmit={(event) => { this.onSubmitSuperlative(event) }} >
          <fieldset>
            <label className="superlative-label" htmlFor="superlativeName">What Is The Superlative?</label>
            <input className="superlative-input" onChange={() => { this.onSuperlativeChange() }} type="text" id="superlativeName" />
          </fieldset>
          <fieldset>
            <label className="superlative-label" htmlFor="imgUrl">Image URL</label>
            <input className="superlative-input" onChange={() => { this.onImgChange() }} type="text" id="imgUrl" />
          </fieldset>
          <input type="submit" className="superlative-input superlative-label" />
        </form>

        <div className="preview"> {/* This will be a preview of the superlative with the given data */}
          <div className="list-item-name superlative-name">{this.state.superlative}</div>
          <img className="list-item-img superlative-img" src={this.state.img} />
        </div>
      </div>
    );
  }
}
