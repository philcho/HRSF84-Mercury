import React from 'react';

const CommentForm = ({onSubmit, onChangeName, onChangeText, name, text}) => {
  const inputStyle = {
    'border': '1px solid black',
    'padding': '5px',
    'margin': '5px'
  };

  return (
    <div className="form-comment container">
      <form onSubmit={onSubmit}>
        <input style={inputStyle} type="text" name="name" onChange={onChangeName} value={name} />
        <input style={inputStyle} type="text" name="comment" onChange={onChangeText} value={text} />
        <input type="submit" value="Submit Comment" />
      </form>
    </div>
  )
};

export default CommentForm;

