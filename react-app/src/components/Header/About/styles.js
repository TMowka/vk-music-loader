export default theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    cursor: 'pointer'
  }
});