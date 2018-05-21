import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = theme => ({
  listGridRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  checkbox: {
    color: '#57c557 !important',
  },
});

const ListComponent = props => (
  <Grid container justify="center">
    <Grid item xs={12}>
      <Typography
        variant="headline"
        align="center"
        gutterBottom
      >
        {props.checklist.title}
      </Typography>
    </Grid>
    <Grid item className={props.classes.listGridRoot}>
      <List>
        {
          props.checklist.items.map(item => (
            <ListItem
              key={item.id}
              dense
              button
              onClick={props.toggleList(item.id)}
            >
              <Checkbox
                className={props.classes.checkbox}
                checked={props.checked.indexOf(item.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        }
      </List>
    </Grid>
  </Grid>
);

ListComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
  toggleList: PropTypes.func.isRequired,
  checked: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default withStyles(styles)(ListComponent);
