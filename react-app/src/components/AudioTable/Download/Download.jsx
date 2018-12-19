import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '../../partial/Dialog/Dialog';

const download = React.memo(props => {
  let title = props.title || 'Download';
  title = props.progressTitle ? `${title} - ${props.progressTitle}` : title;

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

download.propTypes = {
  title: PropTypes.string,
  progressTitle: PropTypes.string,
  progress: PropTypes.number
};

const mapStateToProps = state => ({
  title: state.download.title,
  progressTitle: state.download.progressTitle,
  progress: state.download.progress
});

export default connect(mapStateToProps)(download);