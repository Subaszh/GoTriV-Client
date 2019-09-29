import React, { SFC } from "react";

export const RatingComponent: SFC<{rating: number}> = (props) => {
  const ratingStyle = {
    background: '#388e3c',
    borderRadius: '3px',
    fontWeight: 600,
    display: 'inline-block',
    color: 'white',
    fontSize: '12px',
    padding: '3px 6px'
  }
    
  return <div style={ratingStyle}>{props.rating} <i className="fa fa-star"></i></div>
}