import React from 'react';
import {
  TableHead, TableRow, TableCell, Checkbox
} from '@material-ui/core';
import propTypes from '../../../utils/propTypes';
import PropTypes from 'prop-types';

const tHead = React.memo(props => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox onClick={props.onSelectAll} />
        </TableCell>
        {props.rows.map(row => {
          return (
            <TableCell
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
            >
              {row.label}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
});

tHead.propTypes = {
  rows: propTypes.AudioTable.rows,
  onSelectAll: PropTypes.func
};

export default tHead;