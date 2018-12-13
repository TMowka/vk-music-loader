import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import About from './About/About';
import UploadAudio from './UploadAudio/UploadAudio';
import Settings from './Settings/Settings';

const header = React.memo(props => (
  <div className={props.classes.root}>
    <AppBar position="static">
      <Toolbar>
        <About />
        <div className={props.classes.grow} />
        <div className={props.classes.sectionDesktop}>
          <UploadAudio />
          <Settings />
        </div>
      </Toolbar>
    </AppBar>
  </div>
));

header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(header);