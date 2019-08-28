import React from 'react';
import PropTypes from 'prop-types';

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
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovering: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver() {
    this.setState({
      isHovering: true,
    });
  }

  handleMouseOut() {
    this.setState({
      isHovering: false,
    });
  }

  render() {
    const { isHovering } = this.state;
    const { text, children } = this.props;

    return (
      <div
        className={styles.container}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {isHovering === true && (<div className={styles.tooltip}>{text}</div>)}
      </div>
    );
  }
}

Tooltip.propTypes = propTypes;

export default Tooltip;