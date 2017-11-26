import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Event from '../components/Event';

describe('Event', () => {
  it('should render correctly with props', () => {
    const event = {
      "_id":"_fakeId",
      "name":"Some Awesome Event",
      "picture":"https://www.w3schools.com/w3css/img_fjords.jpg",
      "description":"This is a really cool event",
      "__v":0,
      "comments":[]
    };
    const output = shallow(
      <Event event={event} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

