import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from 'material-ui/Typography';

import { fetchChecklist } from '../../redux-modules/checklist-fetcher';
import List from './List';
import ChecklistCreatorComponent from '../../shared/ChecklistCreator';

export class Checklist extends Component {
  state = {
    checked: [],
    editorMode: false,
  };

  componentDidMount() {
    let url = this.props.location.pathname;
    url = url.substring(1, url.length); // remove '/' from start of url
    this.props.fetchChecklist(url);

    // document.title = this.props.checklist.title;
  }

  componentDidUpdate() {
    document.title = `ChecklistShare - ${this.props.checklist.title}`;
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

  toggleEditMode = () => {
    this.setState({ editorMode: !this.state.editorMode });
  };

  renderContent() {
    if (this.state.editorMode) {
      return <ChecklistCreatorComponent editMode checklist={this.props.checklist} />;
    } else if (this.props.error === 404) {
      return (
        <Typography variant="display1" style={{ textAlign: 'center', marginTop: '20px' }}>
          Not Found
        </Typography>
      );
    }
    return (
      <List
        checklist={this.props.checklist}
        toggleList={this.toggleList}
        checked={this.state.checked}
        toggleEditMode={this.toggleEditMode}
      />
    );
  }

  render() {
    return (
      <div>
        { this.renderContent() }
      </div>
    );
  }
}

Checklist.propTypes = {
  error: PropTypes.number,
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
  error: 0,
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
