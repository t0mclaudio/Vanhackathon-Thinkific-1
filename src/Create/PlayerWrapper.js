import React from 'react';

export default (props) => {
  return (
    <div style={style}>
      {props.state.url ? props.children : "" }
    </div>
  )
}

const style = {
  position: 'relative',
  width: '640px',
  height: '390px',
  backgroundColor: '#222f3e',
  borderRadius: '4px'
}