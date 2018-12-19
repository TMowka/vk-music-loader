import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { SaveAlt } from '@material-ui/icons';
import { connect } from 'react-redux';
import downloadActions from '../../../store/actions/donwload';

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
  fireDownloadAll: () => dispatch(downloadActions.fireDownloadAll())
});

export default connect(null, mapDispatchToProps)(downloadAll);