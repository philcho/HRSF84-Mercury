import React from 'react';

const Event = (props) => {
  return (
    <div className="event list-item container column">
      <img className="list-item-img event-img" src="http://cdn1.theodysseyonline.com/files/2015/12/04/635848643983265445-579762_christmas-puppy-pictures-tzulxzui.jpg"/>
      <div className="list-item-name event-name">Puppy Christmas</div>
      <div className="list-item-description event-description">This is the event description.</div>
    </div>
  )
};

export default Event;
