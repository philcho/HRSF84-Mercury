import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Student from '../components/Student';

describe('Student', () => {
  it('should render correctly with props', () => {
    const student = {
      "_id":"5a0d089080bcabc5ac8cb222",
      "name":"Frodo Baggins",
      "picture":"https://www.w3schools.com/w3css/img_fjords.jpg",
      "bio":"I am from someplace and I did something",
      "__v":0,
      "comments":[]
    };
    const output = shallow(
      <Student studentData={student} key={student._id} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
