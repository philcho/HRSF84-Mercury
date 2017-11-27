import React from 'react';

const CommentForm = ({ onSubmit, onChangeName, onChangeText, onChangeCategory, name, text, category = null }) => {
  return (
    <div className="form-comment container">
      <form className="border-outer" onSubmit={onSubmit}>
        <div className="border-inner">
          {(category !== null) ?
            (
              <div className="select-box">
                <select onChange={onChangeCategory}>
                  <option value="Quote">Quote</option>
                  <option value="To Everyone">To Everyone</option>
                  <option value="To Staff">To Staff</option>
                  <option value="Meme">Meme</option>
                </select>
              </div>
            ) : ''
          }
          <input className="form-input" type="text" name="name" placeholder="name" onChange={onChangeName} value={name} />
          <input className="form-input" type="text" name="comment" placeholder="comment" onChange={onChangeText} value={text} />
          <div className="submit-box">
            <input type="submit" value="Submit Comment" />
          </div>
        </div>

      </form>
    </div>
  )
};

export default CommentForm;
