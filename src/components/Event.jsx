import React from 'react';

const Event = (props) => {
  return (
    <a className="event list-item container column" href={`/eventdetails/${props.event._id}`}>
      <img className="list-item-img event-img" src={props.event.picture}/>
      <div className="list-item-name event-name">{props.event.name}</div>
      <div className="list-item-description event-description">{props.event.description}</div>
    </a>
  )
};

export default Event;
