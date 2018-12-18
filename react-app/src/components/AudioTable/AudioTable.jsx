import React from 'react';
import { connect } from 'react-redux';
import propTypes from '../../utils/propTypes';
import PropTypes from 'prop-types';
import { SaveAlt } from '@material-ui/icons';
import audioActions from '../../store/actions/audio';

import Table from '../partial/Table/Table';
import DownloadProgress from './DownloadProgress/DownloadProgress';

const rows = [
  { id: 'artist', disablePadding: false, label: 'Artist' },
  { id: 'name', disablePadding: false, label: 'Name' },
  { id: 'duration', disablePadding: false, label: 'Duration (minutes)' },
  { id: 'actions', disablePadding: false, label: 'Actions' }
];

const audioTable = React.memo(props => {
  const data = props.data.filter(el => {
    const elFullName = `${el.artist} - ${el.name}`;

    return elFullName.toLowerCase().includes(props.filter.toLowerCase());
  });

  return (
    <>
      <Table
        rows={rows}
        data={data}
        actions={[
          {
            icon: <SaveAlt />,
            handler: (event, key) => props.fireDownload(key)
          }
        ]}
      />
      <DownloadProgress />
    </>
  );
});

audioTable.propTypes = {
  data: propTypes.AudioTable.data,
  filter: PropTypes.string,
  fireDownload: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.audio.list,
  filter: state.audio.filter
});

const mapDispatchToProps = dispatch => ({
  fireDownload: key => dispatch(audioActions.fireDownload(key))
});

export default connect(mapStateToProps, mapDispatchToProps)(audioTable);