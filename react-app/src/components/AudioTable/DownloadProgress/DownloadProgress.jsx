import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import Dialog from '../../partial/Dialog/Dialog';

const downloadProgress = React.memo(props => {
  const title = props.progress >= 0 ? `Download ${props.progress}%` : 'Download';

  return (
    <Dialog
      title={title}
      open={props.progress >= 0}
      fullWidth
    >
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={props.progress}
      />
    </Dialog>
  );
});

const mapStateToProps = state => ({
  progress: state.audio.downloadProgress
});

export default connect(mapStateToProps)(downloadProgress);