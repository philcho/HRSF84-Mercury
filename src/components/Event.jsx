import React from 'react';

const Event = ({ event }) => {
  return (
    <a className="event container column" href={`/event/${event._id}`}>
      <img className="list-item-img event-img" src={event.picture}/>

      <div className="event-text">
        <div className="list-item-name event-name">{event.name}</div>
        <div className="list-item-bio event-bio">{event.description}</div>
      </div>
    </a>
  )
};

export default Event;
