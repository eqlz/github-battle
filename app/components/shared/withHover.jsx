import React from 'react';

function withHover(WrappedComponent, propName = 'isHovering') {
  return class WithHover extends React.Component {
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
      const props = {
        // eslint-disable-next-line react/destructuring-assignment
        [propName]: this.state.isHovering,
        ...this.props,
      };
      // eslint-disable-next-line react/destructuring-assignment
      return (
        <div
          onMouseOver={this.handleMouseOver}
          onFocus={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onBlur={this.handleMouseOut}
        >
          <WrappedComponent {...props} />
        </div>
      );
    }
  };
}

export default withHover;
