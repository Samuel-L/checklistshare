import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchChecklist } from '../../redux-modules/checklist-fetcher';

export class Checklist extends Component {
  componentDidMount() {
    let url = this.props.location.pathname;
    url = url.substring(1, url.length); // remove '/' from start of url
    this.props.fetchChecklist(url);
  }

  render() {
    return (
      <div>
        !error
          show checklist
        else
          show checklist not found
      </div>
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

const mapStateToProps = state => ({
  fetching: state.checklistFetcherReducer.fetching,
  fetched: state.checklistFetcherReducer.fetched,
  error: state.checklistFetcherReducer.error,
  checklist: state.checklistFetcherReducer.checklist,
});

const mapDispatchToProps = dispatch => ({
  fetchChecklist: url => dispatch(fetchChecklist(url)),
});

Checklist.propTypes = {
  fetchChecklist: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
