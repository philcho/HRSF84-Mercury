import React from 'react';

const Shoutout = ({ shoutout }) => {
  return (
    <div className="shoutout list-item container column">
      <div className="">{shoutout.text}</div>
      <div className="">{shoutout.name}</div>
      <div className="">{shoutout.category}</div>
    </div>
  )
};

export default Shoutout;

