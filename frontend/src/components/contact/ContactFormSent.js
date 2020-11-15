import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {},
  paper: {
    ...theme.mixins.gutters(),
    textAlign: 'center',
    margin: '20px',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4
  }
});

function ContactFormSent(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.paper} elevation={3}>
        Thank you for contacting us. We will get back to you as soon as we
        review your comment
      </Paper>
    </div>
  );
}

ContactFormSent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactFormSent);
