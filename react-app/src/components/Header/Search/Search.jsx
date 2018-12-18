import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import audioActions from '../../../store/actions/audio';

const search = React.memo(props => (
  <div className={props.classes.search}>
    <div className={props.classes.searchIcon}>
      <Search />
    </div>
    <InputBase
      placeholder="Search…"
      classes={{
        root: props.classes.inputRoot,
        input: props.classes.inputInput,
      }}
      value={props.filter}
      onChange={event => props.filterChange(event.target.value)}
    />
  </div>
));

search.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  filterChange: PropTypes.func,
  filter: PropTypes.string
};

const mapStateToProps = state => ({
  filter: state.audio.filter
});

const mapDispatchToProps = dispatch => ({
  filterChange: filter => dispatch(audioActions.filterChange(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(search));