import React from 'react';
import {
  IconButton, List, ListItem, ListItemText, Switch, ListItemSecondaryAction, ListSubheader, Tooltip
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import PropTypes from 'prop-types';
import settingsActions from '../../../store/actions/settings';
import { connect } from 'react-redux';

import Dialog from '../../partial/Dialog/Dialog';

const settings = React.memo(props => (
  <Dialog
    trigger={(
      <Tooltip title="Settings">
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Tooltip>
    )}
    title="Settings"
  >
    <List subheader={<ListSubheader>Audio</ListSubheader>} className={props.classes.root}>
      <ListItem>
        <ListItemText primary="Sync audio list at startup" />
        <ListItemSecondaryAction>
          <Switch
            checked={props.data.syncAudioListAtStartup}
            onChange={event => props.fireSet('syncAudioListAtStartup', event.target.checked)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </Dialog>
));

settings.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fireSet: PropTypes.func.isRequired,
  data: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  data: state.settings.data
});

const mapDispatchToProps = dispatch => ({
  fireSet: (key, val) => dispatch(settingsActions.fireSet(key, val))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(settings));