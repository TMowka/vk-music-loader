import PropTypes from 'prop-types';

export default {
  AudioTable: {
    rows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      disablePadding: PropTypes.bool,
      label: PropTypes.string
    })),
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      selected: PropTypes.bool,
      duration: PropTypes.number,
      artist: PropTypes.string,
      name: PropTypes.string,
      progress: PropTypes.number
    }))
  }
};