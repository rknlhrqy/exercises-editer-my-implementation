import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CreateDialog from '../Exercises/Dialog';

const styles = theme => ({
  title: {
    flex: 1
  }
});
export default withStyles(styles)(({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h4" color="inherit" className={classes.title}>
        Exercise Database
      </Typography>
      <CreateDialog />
    </Toolbar>
  </AppBar>
));
