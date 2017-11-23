import React from 'react';

const Comments = ({comments}) => {
  return(
    <div className="container column">
      {comments.map((comment) => {
        return <div key={comment._id} className="comment">{`${comment.name}: ${comment.comment}`}</div>;
      })}
    </div>
  );
};

export default Comments;

