/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any.isRequired,
};

class Hover extends React.Component {
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
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onFocus={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onBlur={this.handleMouseOut}
      >
        {this.props.children(this.state.isHovering)}
      </div>
    );
  }
}

Hover.propTypes = propTypes;

export default Hover;
