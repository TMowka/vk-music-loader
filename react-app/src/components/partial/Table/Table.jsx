import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import propTypes from '../../../utils/propTypes';

import THead from './THead';
import TBody from './TBody';
import TPagination from './TPagination';

class T extends PureComponent {
  state = {
    rowsPerPage: 5,
    page: 0
  }

  handleChangePage = (event, page) => {
    this.setState({
      page
    });
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value
    });
  }

  render() {
    const classes = this.props.classes;
    const { page, rowsPerPage } = this.state;
    const emptyRows = rowsPerPage -
      Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <THead
              rows={this.props.rows}
            />
            <TBody
              data={this.props.data}
              onRowClick={this.props.onRowClick}
              page={page}
              rowsPerPage={rowsPerPage}
              emptyRows={emptyRows}
              actions={this.props.actions}
            />
          </Table>
        </div>
        <TPagination
          count={this.props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

T.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: propTypes.AudioTable.data,
  rows: propTypes.AudioTable.rows,
  onRowClick: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node,
    handler: PropTypes.func
  }))
};

export default withStyles(styles)(T);
