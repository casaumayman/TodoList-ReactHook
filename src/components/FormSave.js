import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardHeader, 
  makeStyles,
  CardContent,
  TextField,
  MenuItem,
  CardActions,
  Button,
  Grid, 
} from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    backgroundColor: '#4285F4',
    color: '#fff'
  },
  textCenter: {
    textAlign: 'center'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  statusInput: {
    marginTop: 20
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

const FormSave = ({ taskEditing, onCloseForm, onSaveTask}) => {
  const [name, setName] = useState('')
  const [status, setStatus] = useState(false)
  const [id, setId] = useState(undefined)
  const classes = useStyles()
  useEffect(() => {
    setId(taskEditing.id)
    setName(taskEditing.name ? taskEditing.name : '')
    setStatus(!(!taskEditing.status))
  }, [taskEditing.id, taskEditing.name, taskEditing.status])
  return (
    <Card>
      <CardHeader  
        className={classes.card}
        title={!id ? 'Thêm Công Việc' : 'Cập nhật công việc'}
      />
      <CardContent className={classes.cardContent}>
        <TextField 
          label="Tên công việc" 
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField 
          label="Trạng thái" 
          select 
          variant="outlined"
          value={status}
          className={classes.statusInput}
          onChange={e => setStatus(e.target.value)}
        >
          <MenuItem value={true} >Xong</MenuItem>
          <MenuItem value={false} >Chưa xong</MenuItem>
        </TextField>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end" style={{marginRight: 9}}>
          <Button
            style={{
              textTransform: 'capitalize',
              color: '#fff',
              backgroundColor: '#0d47a1',
              marginRight: 10
            }}
            onClick={() => onSaveTask({ id, name, status })}
          >
            Lưu
          </Button>
          <Button
            style={{
              textTransform: 'capitalize',
            }}
            variant="outlined"
            color="primary"
            onClick={() => onCloseForm()}
          >
            Huỷ
          </Button>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default FormSave