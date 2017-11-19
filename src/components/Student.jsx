import React from 'react';

const Student = (props) => {
  return (
    <div className="student list-item container column">
      <img className="list-item-img student-img" src="http://cdn.akc.org/akcdoglovers/PembrokeWelshCorgi_hero.jpg"/>
      <div className="list-item-name student-name">Student Name</div>
    </div>
  )
};

export default Student;
