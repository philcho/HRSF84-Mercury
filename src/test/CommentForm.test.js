import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CommentForm from '../components/CommentForm';

describe('Comment Form', () => {
  it('should render correctly with props', () => {
    const output = shallow(
      <CommentForm name="Bob Loblaw" text="Rock on." />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('should call onSubmit function upon submit', () => {
    const onSubmit = jest.fn();
    const onChangeCommentName = jest.fn();
    const onChangeCommentText = jest.fn();

    const output = mount(
      <CommentForm 
        onSubmit={onSubmit} 
        onChangeName={onChangeCommentName}
        onChangeText={onChangeCommentText}
        name="Bob Loblaw" 
        text="Rock on." 
      />
    );
    
    output.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(onSubmit.mock.calls.length).toBe(1);
  });
});
