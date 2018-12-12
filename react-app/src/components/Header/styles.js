export default theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  uploadInput: {
    display: 'none'
  },
  uploadButton: {
    margin: theme.spacing.unit
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
});