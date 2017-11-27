import React from 'react';

const Shoutout = ({ shoutout }) => {
  return (
    <div className='shoutout list-item container column'>
      <div className='shoutout-category'>{shoutout.category}</div>
      <div className='shoutout-text'>{shoutout.text}</div>
      <div className='shoutout-name'>{shoutout.name}</div>
    </div>
  )
};

export default Shoutout;

