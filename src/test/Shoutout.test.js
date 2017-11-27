import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Shoutout from '../components/Shoutout';

describe('Shoutout', () => {
  it('should render correctly with props', () => {
    const shoutout = {
      'name':'Some Awesome Shoutout',
      'text':'Some amazing shoutout text',
      'category':'Meme'
    };
    const output = shallow(
      <Shoutout shoutout={shoutout} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

