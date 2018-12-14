import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Sync } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import audioActions from '../../../store/actions/audio';

const synchronization = React.memo(props => (
  <Tooltip title="Synchronize audio list">
    <IconButton
      color="inherit"
      onClick={props.fireSynchronization}
    >
      <Sync />
    </IconButton>
  </Tooltip>
));

synchronization.propTypes = {
  fireSynchronization: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  fireSynchronization: () => dispatch(audioActions.fireSynchronization())
});

export default connect(null, mapDispatchToProps)(synchronization);