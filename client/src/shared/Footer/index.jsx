import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  base: {
    display: 'flex',
    justifyContent: 'end',
    marginRight: '20px',
  },
  link: {
    margin: '20px',
    textDecoration: 'none',
    color: theme.palette.primary.A700,
  },
});

const Footer = props => (
  <div className={props.classes.base}>
    <Link className={props.classes.link} to="/contact">Contact</Link>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Footer);
