import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { ImportExport } from '@material-ui/icons';
import styles from './styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import audioActions from '../../../store/actions/audio';

import Menu from '../../partial/Menu/Menu';

const importExport = React.memo(props => {
  const items = [
    { name: 'Export', handler: props.fireExport },
    { name: 'Import', handler: props.fireImport }
  ];

  return (
    <Menu
      trigger={(
        <Tooltip title="Import/Export audio list">
          <IconButton color="inherit">
            <ImportExport />
          </IconButton>
        </Tooltip>
      )}
      items={items}
    />
  );
});

importExport.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fireExport: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  fireExport: () => dispatch(audioActions.fireExport()),
  fireImport: () => dispatch(audioActions.fireImport())
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(importExport));