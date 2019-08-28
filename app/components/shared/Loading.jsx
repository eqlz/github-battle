import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

const propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};

const defaultProps = {
  text: 'Loading',
  speed: 300,
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.text,
    };
  }

  componentDidMount() {
    const { text, speed } = this.props;
    this.interval = setInterval(() => {
      // eslint-disable-next-line react/destructuring-assignment
      this.state.content = this.state.content === `${text}...`
        ? this.setState({ content: `${text}...` })
        : this.setState(({ content }) => ({ content: `${content}.` }));
    }, speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      // eslint-disable-next-line react/destructuring-assignment
      <p style={styles.content}>{this.state.content}</p>
    );
  }
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
