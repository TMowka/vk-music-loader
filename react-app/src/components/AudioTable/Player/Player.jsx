import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import propTypes from '../../../utils/propTypes';

import Dialog from '../../partial/Dialog/Dialog';

const player = React.memo(props => {
  const title = props.audio && props.audio.artist + ' - ' + props.audio.name;
  const url = props.audio && props.audio.url;

  return (
    <Dialog
      title={title}
      open={!!props.audio}
      fullWidth
      onClose={props.onClose}
    >
      <audio controls autoPlay controlsList="nodownload" className={props.classes.audio}>
        <source src={url} type="audio/mp3" />
      </audio>
    </Dialog>
  );
});

player.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  audio: propTypes.audio,
  onClose: PropTypes.func
};

const mapStateToProps = state => ({
  audio: state.player.audio
});

export default connect(mapStateToProps)(withStyles(styles)(player));