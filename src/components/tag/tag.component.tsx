import React, { SFC } from "react";

export const TagComponent: SFC<{content: string}> = (props) => {
  const tagStyle = {
    borderRadius: '2px',
    display: 'inline-block',
    background: '#9b9b9b',
    fontWeight: 600,
    color: 'white',
    padding: '3px 8px',
    margin: '0 4px',
    fontSize: '12px'
  }

  return <div className="tag" style={tagStyle}>{props.content}</div>
}