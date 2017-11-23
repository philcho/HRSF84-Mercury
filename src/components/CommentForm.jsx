import React from 'react';

const CommentForm = ({onSubmit, onChangeName, onChangeText, name, text}) => {
  return (
    <div className="form-comment container">
      <form onSubmit={onSubmit}>
        <input type="text" name="name" onChange={onChangeName} value={name} />
        <input type="text" name="comment" onChange={onChangeText} value={text} />
        <input type="submit" value="Submit Comment" />
      </form>
    </div>
  )
};

export default CommentForm;

