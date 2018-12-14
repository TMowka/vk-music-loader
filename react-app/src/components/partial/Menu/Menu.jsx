import React, { PureComponent } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

class M extends PureComponent {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    return (
      <div>
        <div
          aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {this.props.trigger}
        </div>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.items.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                item.handler();
                this.handleClose();
              }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

M.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    handler: PropTypes.func
  })),
  trigger: PropTypes.node.isRequired
};

export default M;