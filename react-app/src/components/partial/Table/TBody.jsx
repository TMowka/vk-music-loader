import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import propTypes from '../../../utils/propTypes';

const tBody = React.memo(props => {
  const count = props.page * props.rowsPerPage;

  return (
    <TableBody>
      {props.data
        .slice(count, count + props.rowsPerPage)
        .map(el => {
          const minutes = Math.floor(el.duration / 60);
          const seconds = el.duration - minutes * 60;

          return (<TableRow
            hover
            onClick={event => props.onRowClick && props.onRowClick(event, el.key)}
            key={el.key}
          >
            <TableCell>{el.artist}</TableCell>
            <TableCell>{el.name}</TableCell>
            <TableCell>
              {`${minutes}:${seconds >= 0 && seconds < 10 ? '0' + seconds : seconds}`}
            </TableCell>
            <TableCell>
              {props.actions.map((act, index) => (
                <IconButton key={index} color="inherit" onClick={(e) => act.handler(e, el.key)}>
                  {act.icon}
                </IconButton>
              ))}
            </TableCell>
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
  onRowClick: PropTypes.func,
  emptyRows: PropTypes.number,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default tBody;
