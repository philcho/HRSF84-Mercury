import React from 'react';

const Student = (props) => {
  return (
    <div className="student list-item container column">
      <img className="list-item-img student-img" src={props.studentData.picture} />
      <div className="list-item-name student-name">{props.studentData.name}</div>
    </div>
  )
};

export default Student;
