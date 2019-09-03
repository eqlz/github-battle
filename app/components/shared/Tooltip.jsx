import React from 'react';
import PropTypes from 'prop-types';

// import withHover from './withHover';
import Hover from './Hover';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
  },
  tooltip: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '160px',
    bottom: '100%',
    left: '50%',
    marginLeft: '-80px',
    borderRadius: '3px',
    backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
    padding: '7px',
    marginBottom: '5px',
    color: '#fff',
    textAlign: 'center',
    fontSize: '14px',
  },
};

const propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
};

const defaultProps = {
  children: null,
};

function Tooltip({ text, children }) {
  return (
    <Hover>
      {(isHovering) => (
        <div style={styles.container}>
          {isHovering === true && (<div style={styles.tooltip}>{text}</div>)}
          {children}
        </div>
      )}
    </Hover>
  );
}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

// export default withHover(Tooltip, 'isHovering');
export default Tooltip;
