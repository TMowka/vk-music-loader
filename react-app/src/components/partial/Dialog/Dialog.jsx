import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class D extends PureComponent {
  state = {
    open: false
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  render() {
    const classes = this.props.classes;
    let content = this.props.children;
    if (typeof content === 'string')
      content = (
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      );

    return (
      <div>
        <div onClick={this.handleClickOpen}>
          {this.props.trigger}
        </div>
        <Dialog
          onClose={this.handleClose}
          open={this.state.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.props.title}
          </DialogTitle>
          <DialogContent className={classes.content}>
            {content}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

D.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  title: PropTypes.string,
  trigger: PropTypes.node.isRequired
};

export default withStyles(styles)(D);