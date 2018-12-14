import React from 'react';
import { connect } from 'react-redux';
import propTypes from '../../utils/propTypes';
import PropTypes from 'prop-types';
import { SaveAlt } from '@material-ui/icons';
import audioActions from '../../store/actions/audio';

import Table from '../partial/Table/Table';

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
        handler: (event, key) => props.fireDownload(key)
      }
    ]}
  />
));

audioTable.propTypes = {
  data: propTypes.AudioTable.data,
  fireDownload: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.audio.list
});

const mapDispatchToProps = dispatch => ({
  fireDownload: key => dispatch(audioActions.fireDownload(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(audioTable);