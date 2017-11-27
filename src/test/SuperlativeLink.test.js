import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SuperlativeLink from '../components/SuperlativeLink';

describe('SuperlativeLink', () => {
  it('should render correctly with props', () => {
    const superlative = {
      'img':'https://www.w3schools.com/w3css/img_fjords.jpg',
      'superlative':'This is a really cool superlative'
    };
    const output = shallow(
      <SuperlativeLink superlative={superlative} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});

