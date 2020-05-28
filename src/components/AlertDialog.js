import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles({
  button: {
    color: '#CC0000'
  }
})

const AlertDialog = ({ task, open, onClose, onRemoveTask }) => {
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Bạn có chắc muốn xóa {task.name}!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sau khi xóa sẽ không thể khôi phục lại.
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          color="inherit" 
          variant="outlined" 
          className={classes.button}
          onClick={() => {
            onRemoveTask(task.id)
            onClose()
          }}
        >
          Xóa
        </Button>
        <Button 
          color="primary" 
          variant="outlined"
          onClick={onClose}
        >
          Giữ lại
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog