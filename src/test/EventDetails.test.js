import React from 'react';
import { mount, shallow } from 'enzyme';
import { mountToJson, shallowToJson } from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import EventDetails from '../components/EventDetails';

describe('Event Details', () => {

  // --- this works: Builds Event Details page using fake data. ---
  // But it's not ideal since it uses setState instead of the fake server to pass data
  it('should render correctly when passed data', () => {
    // We're only using the fake server to prevent the getEventDetailsData() method in EventDetails.jsx from throwing errors
    var mock = new MockAdapter(axios);
    mock.onPost('/getParticular').reply(200, {});

    const eventData = {
      "_id":"5a0dd97850afe3ca33f34c04",
      "name":"Graduation",
      "date":"October the 21",
      "picture":"http://cdn1.theodysseyonline.com/files/2015/12/04/635848643983265445-579762_christmas-puppy-pictures-tzulxzui.jpg",
      "description":"Oh the places we'll go!",
      "__v":0,
      "comments":[]
    };
    const output = shallow(
      <EventDetails />
    );
    // Update the component with our mock data
    output.setState({ eventDetailsData: eventData });
    expect(shallowToJson(output)).toMatchSnapshot();    
  });

  // --- this works: checks if componentDidMount was called ---
  // it('calls componentDidMount() lifecycle method', () => {
  //   const spy = jest.spyOn(EventDetails.prototype, 'componentDidMount');
  //   const wrapper = mount(<EventDetails />);
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockClear();
  // });

  // --- this works: checks that a re-render happened after forcing an update ---
  // it('calls render() lifecycle method twice when using Enzyme forceUpdate', () => {
  //   const spy = jest.spyOn(EventDetails.prototype, 'render');
  //   const wrapper = mount(<EventDetails />);
  //   wrapper.instance().forceUpdate();
  //   expect(spy).toHaveBeenCalledTimes(2);
  //   spy.mockClear();
  // });

  // // --- this doesn't work yet. Supposed to use a mock server to send fake data. But 'expect' is being called before EventDetails has updated its state.  ---
  // it('should render correctly after a POST request', () => {
  //   // Create fake server
  //   var mock = new MockAdapter(axios);
  //   // Set mock response data (in array)
  //   const eventData = [{
  //     "_id":"5a0dd97850afe3ca33f34c04",
  //     "name":"Graduation",
  //     "date":"October the 21",
  //     "picture":"http://cdn1.theodysseyonline.com/files/2015/12/04/635848643983265445-579762_christmas-puppy-pictures-tzulxzui.jpg",
  //     "description":"Oh the places we'll go!",
  //     "__v":0,
  //     "comments":[]
  //   }];
  //   // Tell fake server to send back our mock response data
  //   mock.onPost('/getParticularEvent').reply(200, eventData);
  //   // mock.onPost('/getParticularEvent').reply(function(config) {
  //   //   return new Promise(function(resolve, reject) {
  //   //     setTimeout(function() {
  //   //       resolve([200, eventData]);
  //   //     }, 0);
  //   //   });
  //   // });
  
  //   // Use Enzyme's 'mount' instead of 'shallow' to ensure we include the 'componentDidMount' call in EventDetails.jsx
  //   const output = mount(
  //     <EventDetails />
  //   );
  //   // output.instance().forceUpdate()
  //   console.log('output.state', output.state('eventDetailsData'));
  //   expect(mountToJson(output)).toMatchSnapshot();
  // });
});
