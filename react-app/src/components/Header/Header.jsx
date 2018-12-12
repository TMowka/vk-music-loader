import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core';
import { Settings, CloudUpload } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import audioActions from '../../store/actions/audio';
import { connect } from 'react-redux';

import Dialog from '../partial/Dialog/Dialog';

class Header extends PureComponent {
  state = {

  }

  uploadAudioList = (event) => {
    this.props.audioSendListPath(event.target.value);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              VK Music Loader
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Dialog
                trigger={
                  <IconButton color="inherit">
                    <CloudUpload />
                  </IconButton>
                }
                title="Upload audio list"
              >
                <input
                  accept=".json"
                  className={classes.uploadInput}
                  id="contained-button-file"
                  type="file"
                  onChange={this.uploadAudioList}
                />
                <label htmlFor="contained-button-file">
                  <Button color="secondary" component="span" className={classes.uploadButton}>
                    Select file
                  </Button>
                </label>
              </Dialog>
              <IconButton color="inherit">
                <Settings />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  audioSendListPath: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  audioSendListPath: path => dispatch(audioActions.audioSendListPath(path))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(Header));