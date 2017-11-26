import React from 'react';

const SuperlativeLink = ({superlative}) => {
  return (
    <a className="superlative-details-info container column" href={`/superlative/${superlative._id}`}>
      <img className="superlative-picture" src={superlative.img} />
      <div className="container column">
        <div className="superlative-name">{superlative.superlative}</div>
      </div>
    </a>
  )
};

export default SuperlativeLink;
