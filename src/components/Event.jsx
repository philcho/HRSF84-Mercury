import React from 'react';

const Event = ({event}) => {
  return (
    // <a className="event container column" href={`/event/${event._id}`}>
    //   <img className="list-item-img event-img" src={event.picture}/>
    //   <div className="list-item-name event-name">{event.name}</div>
    //   <div className="list-item-bio event-bio">{event.description}</div>
    // </a>

    <a className="event container column" href="###">
      <img className="list-item-img event-img" src="http://cdn1.theodysseyonline.com/files/2015/12/04/635848643983265445-579762_christmas-puppy-pictures-tzulxzui.jpg"/>
      <div className="list-item-name event-name">Puppy Christmas</div>
      <div className="list-item-bio event-bio">There were puppies and we all played and laughed and danced!</div>
    </a>
  )
};

export default Event;
