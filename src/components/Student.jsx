import React from 'react';

const Student = ({ studentData }) => {
  return (
    <div className="student container column">
      {/* <a className="student-box" href={`/profile/${studentData._id}`}>
        <img className="list-item-img student-img" src={studentData.picture} />
        <label className="list-item-name student-name">{studentData.name}</label>
      </a> */}

      <a className="student-box" href="###">
        <img className="list-item-img student-img" src="https://cdn.dribbble.com/users/2973/screenshots/1331728/drbbbl_01.jpg"/>
        <label className="list-item-name student-name">Sam Sepiol</label>
      </a>
    </div>
  )
};

export default Student;
