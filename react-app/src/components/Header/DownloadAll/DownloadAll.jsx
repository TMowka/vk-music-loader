import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { SaveAlt } from '@material-ui/icons';
import { connect } from 'react-redux';
import audioActions from '../../../store/actions/audio';

const downloadAll = React.memo(props => (
  <Tooltip title="Download all">
    <IconButton
      color="inherit"
      onClick={props.fireDownloadAll}
    >
      <SaveAlt />
    </IconButton>
  </Tooltip>
));

const mapDispatchToProps = dispatch => ({
  fireDownloadAll: () => dispatch(audioActions.fireDownloadAll())
});

export default connect(null, mapDispatchToProps)(downloadAll);