import React from 'react';

const Event = (props) => {
  return (
    <div className="event list-item container column">
      <img className="list-item-img event-img" src={props.event.picture}/>
      <div className="list-item-name event-name">{props.event.name}</div>
      <div className="list-item-description event-description">{props.event.description}</div>
    </div>
  )
};

export default Event;
