import React from 'react';

const CommentForm = ({ onSubmit, onChangeName, onChangeText, onChangeCategory, name, text, category = null }) => {
  const inputStyle = {
    'border': '1px solid black',
    'padding': '5px',
    'margin': '5px'
  };

  return (
    <div className='form-comment container'>
      <form onSubmit={onSubmit}>
        {(category !== null) ?
          (
            <select onChange={onChangeCategory}>
              <option value="Quote">Quote</option>
              <option value="To Everyone">To Everyone</option>
              <option value="To Staff">To Staff</option>
              <option value="Meme">Meme</option>
            </select>
          ) : ''
        }
        <input style={inputStyle} type="text" name='name' placeholder='name' onChange={onChangeName} value={name} />
        <input style={inputStyle} type="text" name='comment' placeholder='comment' onChange={onChangeText} value={text} />
        <input type='submit' value='Submit Comment' />
      </form>
    </div>
  )
};

export default CommentForm;

