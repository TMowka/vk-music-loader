import React from 'react';
import { connect } from 'react-redux';
import propTypes from '../../utils/propTypes';
import PropTypes from 'prop-types';
import { SaveAlt } from '@material-ui/icons';
import electronActionTypes from '../../electronActionTypes';

import Table from '../partial/Table/Table';

const { ipcRenderer } = window.require('electron');

const rows = [
  { id: 'artist', disablePadding: false, label: 'Artist' },
  { id: 'name', disablePadding: false, label: 'Name' },
  { id: 'duration', disablePadding: false, label: 'Duration (minutes)' },
  { id: 'progress', disablePadding: false, label: 'Progress' },
  { id: 'actions', disablePadding: false, label: 'Actions' }
];

const audioTable = React.memo(props => (
  <Table
    rows={rows}
    data={props.data}
    actions={[
      {
        icon: <SaveAlt />,
        handler: (event, key) => ipcRenderer
          .send(electronActionTypes.react.AUDIO_DOWNLOAD_SINGLE, key)
      }
    ]}
  />
));

audioTable.propTypes = {
  data: propTypes.AudioTable.data,
  audioToggleSelect: PropTypes.func,
  audioToggleSelectAll: PropTypes.func
};

const mapStateToProps = state => ({
  data: state.audio.list
});

export default connect(mapStateToProps)(audioTable);