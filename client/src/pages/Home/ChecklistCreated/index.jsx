import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

import clientBaseURL from '../../../utils/client-helpers';

const SuccessfulCreation = props => (
  <Grid item>
    <Typography
      variant="headline"
      align="center"
      gutterBottom
    >
      Checklist created!
    </Typography>
    <Typography
      variant="body2"
      align="center"
    >
      {clientBaseURL}/{props.url}
    </Typography>
  </Grid>
);

SuccessfulCreation.propTypes = {
  url: PropTypes.string.isRequired,
};

const FailedCreation = () => (
  <Grid item>
    <Typography
      variant="headline"
      align="center"
      gutterBottom
    >
      Something went wrong on our end. Please try again.
    </Typography>
  </Grid>
);

const ChecklistCreated = props => (
  <Grid container justify="center">
    { props.adding && !props.added
      ?
        <Grid item>
          <CircularProgress size={70} />
        </Grid>
      :
        [
          (props.added && props.url ? <SuccessfulCreation key="0" url={props.url} /> : <FailedCreation key="0" />),
        ]
    }
  </Grid>
);

ChecklistCreated.propTypes = {
  adding: PropTypes.bool,
  added: PropTypes.bool,
  url: PropTypes.string,
};

ChecklistCreated.defaultProps = {
  adding: false,
  added: false,
  url: '',
};

export default ChecklistCreated;
