import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchChecklist } from '../../redux-modules/checklist-fetcher';
import List from './List';

export class Checklist extends Component {
  state = {
    checked: [],
  };

  componentDidMount() {
    let url = this.props.location.pathname;
    url = url.substring(1, url.length); // remove '/' from start of url
    this.props.fetchChecklist(url);
  }

  toggleList = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  render() {
    return (
      <div>
        <List
          checklist={this.props.checklist}
          toggleList={this.toggleList}
          checked={this.state.checked}
        />
      </div>
    );
  }
}

Checklist.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  checklist: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      List: PropTypes.number,
      name: PropTypes.string,
    })),
  }).isRequired,
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
