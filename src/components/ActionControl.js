import React from 'react'
import { Grid, TextField, makeStyles, MenuItem, InputAdornment } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles({
  statusInput: {
    marginTop: 5,
    width: 160
  },
  searchInput: {
    marginRight: 8,
    marginLeft: 8,
    width: '78%'
  },
  container: {
    marginTop: 20,
    marginBottom: 20
  }
})

const ActionControl = ({ handleAction, search, filter }) => {
  const classes = useStyles()
  const changeValue = (search, filter) => {
    handleAction({ search, filter })
  }

  return <Grid container className={classes.container} direction="row">
    <TextField
      label="Tìm kiếm"
      value={search}
      onChange={e => changeValue(e.target.value, filter)}
      style={{ marginTop: 5 }}
      variant="outlined"
      className={classes.searchInput}
      InputProps={{
        startAdornment: <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>,
      }}
    />
    <TextField
      label="Lọc trạng thái"
      value={filter}
      onChange={e => changeValue(search, e.target.value)}
      select
      variant="outlined"
      className={classes.statusInput}
    >
      <MenuItem value={0}>Tất cả</MenuItem>
      <MenuItem value={1}>Xong</MenuItem>
      <MenuItem value={2}>Chưa xong</MenuItem>
    </TextField>
  </Grid>
}

export default ActionControl