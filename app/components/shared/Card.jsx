import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  subheader: '',
};

function Card({
  header, subheader, name, avatarUrl, profileUrl, children,
}) {
  return (
    <div className="card bg-light">
      <h4 className="header-lg center-text">
        {header}
      </h4>

      <img
        className="avatar"
        src={avatarUrl}
        alt={`Avatar for ${name}`}
      />

      {subheader
        && (
          <h4 className="center-text">
            {subheader}
          </h4>
        )}

      <h2 className="center-text">
        <a className="link" href={profileUrl}>
          {name}
        </a>
      </h2>
      {children}
    </div>
  );
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
