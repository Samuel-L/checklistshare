import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  base: {},
  title: {
    marginTop: '20px',
  },
  text: {
    marginTop: '10px',
  },
  link: {
    color: theme.palette.primary.A700,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
});

const Contact = props => (
  <Grid container>
    <Grid item xs={12}>
      <Typography
        className={props.classes.title}
        variant="display1"
        align="center"
        gutterBottom
      >
        Contact
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography className={props.classes.text}>
        Feedback and bug findings can be sent to samuell.person@gmail.com.
      </Typography>
      <Typography className={props.classes.text}>
        Source code can be found <a className={props.classes.link} href="https://github.com/Samuel-L/checklistshare">here</a>.
      </Typography>
    </Grid>
  </Grid>
);

Contact.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Contact);
