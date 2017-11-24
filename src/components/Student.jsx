import React from 'react';

const Student = (props) => {
  return (
    <div className="student list-item container column">
      <a className="list-item-a student-a" href={`/profile/${props.studentData._id}`}>
        <img className="list-item-img student-img" src={props.studentData.picture} />
        <label className="list-item-name student-name">{props.studentData.name}</label>
      </a>
    </div>
  )
};

export default Student;
