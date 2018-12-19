import React from 'react';
import { connect } from 'react-redux';
import propTypes from '../../utils/propTypes';
import PropTypes from 'prop-types';
import { SaveAlt, PlayCircleOutline } from '@material-ui/icons';
import downloadActions from '../../store/actions/donwload';
import playerActions from '../../store/actions/player';

import Table from '../partial/Table/Table';
import Download from './Download/Download';
import Player from './Player/Player';

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
            icon: <PlayCircleOutline />,
            handler: (event, key) => props.play(key)
          },
          {
            icon: <SaveAlt />,
            handler: (event, key) => props.fireDownload(key)
          }
        ]}
      />
      <Download />
      <Player onClose={props.stop} />
    </>
  );
});

audioTable.propTypes = {
  data: propTypes.AudioTable.data,
  filter: PropTypes.string,
  fireDownload: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  stop: PropTypes.func
};

const mapStateToProps = state => ({
  data: state.audio.list,
  filter: state.audio.filter
});

const mapDispatchToProps = dispatch => ({
  fireDownload: key => dispatch(downloadActions.fireDownload(key)),
  play: key => dispatch(playerActions.play(key)),
  stop: () => dispatch(playerActions.stop())
});

export default connect(mapStateToProps, mapDispatchToProps)(audioTable);