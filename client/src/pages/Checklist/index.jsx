import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Checklist extends Component {
  componentWillMount() {
    const url = this.props.location.pathname;
    console.log(`Get data from backend using: ${url}`);
  }

  render() {
    return (
      <div>Checklist</div>
    );
  }
}

Checklist.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

Checklist.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Checklist;
