import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow, TableCell, Checkbox } from '@material-ui/core';
import propTypes from '../../../utils/propTypes';

const tBody = React.memo((props) => {
  const count = props.page * props.rowsPerPage;

  return (
    <TableBody>
      {props.data
        .slice(count, count + props.rowsPerPage)
        .map(r => {
          const minutes = Math.floor(r.duration / 60);
          const seconds = r.duration - minutes * 60;

          return (<TableRow
            hover
            onClick={event => props.onRowClick(event, r.id)}
            role="checkbox"
            aria-checked={r.selected}
            tabIndex={-1}
            key={r.id}
            selected={r.selected}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={r.selected} />
            </TableCell>
            <TableCell>
              {`${minutes}:${seconds >= 0 && seconds < 10 ? '0' + seconds : seconds}`}
            </TableCell>
            <TableCell>{r.artist}</TableCell>
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.progress}</TableCell>
          </TableRow>
          );
        })}
      {props.emptyRows > 0 && (
        <TableRow style={{ height: 49 * props.emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
});

tBody.propTypes = {
  data: propTypes.AudioTable.data,
  onRowClick: PropTypes.func.isRequired,
  emptyRows: PropTypes.number,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default tBody;
