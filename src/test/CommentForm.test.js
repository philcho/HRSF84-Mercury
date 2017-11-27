import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CommentForm from '../components/CommentForm';

describe('Comment Form', () => {
  it('should render correctly with props', () => {
    const output = shallow(
      <CommentForm name="Bob Loblaw" text="Rock on." />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
