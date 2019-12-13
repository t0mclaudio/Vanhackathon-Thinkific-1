import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

export default props => (
  <div style={style.overlay}>
    <div style={style.nav}>
      <span>
        {props.state.currentModule !== "A" &&
          <FontAwesomeIcon
            style={style.open}
            icon={faArrowAltCircleLeft}
            onClick={() => props.updateModalModule("A")}
          />
        }
      </span>
      <span style={{ textAlign: 'right' }}>
        <FontAwesomeIcon
          style={style.close}
          icon={faTimesCircle}
          onClick={() => props.closeComposer()} 
        />
      </span>
    </div>
    {props.children}
    <p style={style.text}>Prompt will be positioned at {props.state.time.elapsed}</p>
  </div>
)


const style = {
  overlay: {
    display: 'grid',
    width: '640px',
    minHeight: '427px',
    backgroundColor: '#222f3e',
    zIndex: "99",
    position: 'absolute',
    borderRadius: '4px',
    padding: '15px',
    color: 'white'
  },
  close: {
    textAlign: 'right',
    fontSize: '28px',
    cursor: 'pointer',
  },
  open: {
    fontSize: '28px',
    cursor: 'pointer',
  },
  nav: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginBottom: "15px"
  },
  text: {
    fontSize: '18px',
    textAlign: 'right',
  }

}