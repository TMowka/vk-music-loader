import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import audioActions from '../../../store/actions/audio';

const uploadAudio = React.memo(props => (
  <IconButton
    color="inherit"
    onClick={props.fireAudioUploadList}
  >
    <CloudUpload />
  </IconButton>
));

uploadAudio.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fireAudioUploadList: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  fireAudioUploadList: () => dispatch(audioActions.fireAudioUploadList())
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(uploadAudio));