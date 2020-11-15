import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CopyrightText from './CopyrightText';

const styles = theme => ({
  root: {
    position: "relative",
    left: 0,
    right: 0,
    bottom: 0,
    fontSize: "14px",
    backgroundColor: theme.palette.primary.light,
    padding: "5px",
    textAlign: 'left',

  },
  social: {
    // paddingBottom: "5px",
    '& img': {
      width: "30px"
    }
  }

});

class FooterPage extends Component {

  render() {
    const { classes } = this.props;

    return (

          <div className={classes.root}>
          <CopyrightText/> &nbsp;&nbsp;
            DataBETA is a project conducted by Josh Mitteldorf  in cooperation with the McGill University laboratory of Moshe Szyf.
            Walter Crompton is Operations Director. We are grateful to Steve Horvath of UCLA for advice and encouragement.
            This is an open-source project in service to the community. All data (redacted to protect identities) will be posted on a public website.
          </div>

    );
  }
}

export default withStyles(styles)(FooterPage);
