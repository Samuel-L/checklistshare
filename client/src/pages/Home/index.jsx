import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChecklistCreatorComponent from '../../shared/ChecklistCreator';
import ChecklistCreatedComponent from './ChecklistCreated';

const Home = props => (
  <div>
    { !props.adding && !props.added && !props.error
      ?
        <ChecklistCreatorComponent />
      :
        <ChecklistCreatedComponent
          adding={props.adding}
          added={props.added}
          url={props.url}
        />
    }
  </div>
);

const mapStateToProps = state => ({
  adding: state.checklistAdderReducer.adding,
  added: state.checklistAdderReducer.added,
  error: state.checklistAdderReducer.error,
  url: state.checklistAdderReducer.url,
});

const mapDispatchToProps = () => ({});

Home.propTypes = {
  adding: PropTypes.bool,
  added: PropTypes.bool,
  error: PropTypes.number,
  url: PropTypes.string,
};

Home.defaultProps = {
  adding: false,
  added: false,
  error: null,
  url: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
