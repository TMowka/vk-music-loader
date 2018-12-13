import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';

import Dialog from '../../partial/Dialog/Dialog';

const about = React.memo(props => (
  <Dialog
    trigger={(
      <Typography className={props.classes.title} variant="h6" color="inherit" noWrap>
        VK Music Loader
      </Typography>
    )}
    title="About"
  >
    powered by: <span>TMowka</span>
  </Dialog>
));

about.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(about);