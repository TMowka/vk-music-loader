import PropTypes from 'prop-types';

export default {
  AudioTable: {
    rows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      disablePadding: PropTypes.bool,
      label: PropTypes.string
    })),
    data: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      artist: PropTypes.string,
      name: PropTypes.string,
      duration: PropTypes.number,
      progress: PropTypes.number
    }))
  }
};