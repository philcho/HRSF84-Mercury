import React from 'react';

const Shoutout = (props) => {
  return (
    <div className="shoutout list-item container column">
      <div className="">{props.shoutout.text}</div>
      <div className="">{props.shoutout.name}</div>
      <div className="">{props.shoutout.category}</div>
    </div>
  )
};

export default Shoutout;
