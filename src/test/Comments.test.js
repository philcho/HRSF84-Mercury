
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Comments from '../components/Comments';

describe('Comments', () => {
  it('should render correctly with props', () => {
    const comments = [{
      '_id': '_fakeId',
      'name': 'Some Awesome Name',
      'comment': 'A great comment!'
    }];
    const output = shallow(
      <Comments comments={comments} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

