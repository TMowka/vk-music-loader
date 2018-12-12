import React from 'react';
import { connect } from 'react-redux';
import propTypes from '../../utils/propTypes';
import PropTypes from 'prop-types';
import audioActions from '../../store/actions/audio';

import Table from '../partial/Table/Table';

const rows = [
  { id: 'duration', numeric: false, disablePadding: false, label: 'Duration (minutes)' },
  { id: 'artist', numeric: false, disablePadding: false, label: 'Artist' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'progress', numeric: false, disablePadding: false, label: 'Progress' }
];

const audioTable = React.memo(props => (
  <Table
    rows={rows}
    data={props.data}
    onSelectAll={event => props.audioToggleSelectAll(event.target.checked)}
    onRowClick={(event, id) => props.audioToggleSelect(id)}
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

const mapDispatchToProps = dispatch => ({
  audioToggleSelect: id => dispatch(audioActions.audioToggleSelect(id)),
  audioToggleSelectAll: state => dispatch(audioActions.audioToggleSelectAll(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(audioTable);