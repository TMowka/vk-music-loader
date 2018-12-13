import React from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';
import propTypes from '../../../utils/propTypes';

const tHead = React.memo(props => {
  return (
    <TableHead>
      <TableRow>
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
  rows: propTypes.AudioTable.rows
};

export default tHead;