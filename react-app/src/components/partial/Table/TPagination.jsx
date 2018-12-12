import React from 'react';
import PropTypes from 'prop-types';
import { TablePagination } from '@material-ui/core';

const tPagination = React.memo(props => (
  <TablePagination
    rowsPerPageOptions={[5, 10]}
    component="div"
    count={props.count}
    rowsPerPage={props.rowsPerPage}
    page={props.page}
    backIconButtonProps={{
      'aria-label': 'Previous page',
    }}
    nextIconButtonProps={{
      'aria-label': 'Next page',
    }}
    onChangePage={props.onChangePage}
    onChangeRowsPerPage={props.onChangeRowsPerPage}
  />
));

tPagination.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
};

export default tPagination;
