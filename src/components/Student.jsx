import React from 'react';

const Student = ({studentData}) => {
  return (
    <div className="student list-item container column">
      <a className="list-item-a student-a" href={`/profile/${studentData._id}`}>
        <img className="list-item-img student-img" src={studentData.picture} />
        <label className="list-item-name student-name">{studentData.name}</label>
      </a>
    </div>
  )
};

export default Student;
