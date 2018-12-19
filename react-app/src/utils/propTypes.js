import PropTypes from 'prop-types';

const audio = PropTypes.shape({
  key: PropTypes.string.isRequired,
  artist: PropTypes.string,
  name: PropTypes.string,
  duration: PropTypes.number
});

export default {
  audio,
  AudioTable: {
    rows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      disablePadding: PropTypes.bool,
      label: PropTypes.string
    })),
    data: PropTypes.arrayOf(audio)
  }
};