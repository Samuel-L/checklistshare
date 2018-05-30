import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Snackbar from 'material-ui/Snackbar';

import clientBaseURL from '../../../utils/client-helpers';

export class SuccessfulCreation extends Component {
  state = { copied: false };

  render() {
    const url = `${clientBaseURL}/${this.props.url}`;

    return (
      <React.Fragment>
        <Grid item xs={12} md={6}>
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
            {url}
          </Typography>
          <CopyToClipboard text={url} onCopy={() => this.setState({ copied: true })} style={{ float: 'right' }}>
            <Button variant="raised" color="primary">
              Copy url
            </Button>
          </CopyToClipboard>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={this.state.copied}
          message="URL was copied successfully!"
        />
      </React.Fragment>
    );
  }
}

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
