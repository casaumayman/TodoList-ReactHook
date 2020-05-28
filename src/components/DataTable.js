import React, { useState } from 'react'
import { 
  TableContainer, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  makeStyles, 
  TableBody,
  TableSortLabel,
  Chip,
  Button,
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import { Delete as DeleteIcon } from '@material-ui/icons'
import AlertDialog from './AlertDialog'

const useStyles = makeStyles(theme => ({
  container: {
    margin: 8,
    width: '99%'
  },
  chipStatusTrue: {
    color: '#fff',
    backgroundColor: '#007E33'
  },
  chipStatusFalse: {
    backgroundColor: '#CC0000',
    color: '#fff'
  },
  button: {
    margin: theme.spacing(1)
  }
}))

const DataTable = ({ tasks, onRemoveTask, onOpenForm, sort, onSort }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const [taskRemoving, setTaskRemoving] = useState({})
  const onHandleRemoveTask = task => {
    setTaskRemoving(task)
    setOpenDialog(true)
  }
  return <TableContainer className={classes.container} component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>STT</TableCell>
          <TableCell align="center">Tên công việc</TableCell>
          <TableCell
            align="center"
            sortDirection="asc"
          >
            <TableSortLabel
              active={!!sort}
              direction={sort === 1 ? 'asc' : 'desc'}
              onClick={onSort}
            >
              Trạng thái
            </TableSortLabel>
          </TableCell>
          <TableCell align="center">Thao tác</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {tasks.map((task, index) => (
        <TableRow key={task.id}>
          <TableCell component="th" scope="row">
            {index+1}
          </TableCell>
          <TableCell align="center">{task.name}</TableCell>
          <TableCell align="center">
            <Chip 
              label={task.status ? 'Xong' : 'Chưa Xong'}
              className={task.status ? classes.chipStatusTrue : classes.chipStatusFalse}
            />
          </TableCell>
          <TableCell align="center">
            <Button 
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<CreateIcon />}
              size="small"
              onClick={() => onOpenForm(task)}
            >
              Sửa
            </Button>
            <Button 
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              size="small"
              onClick={() => onHandleRemoveTask(task)}
            >
              Xóa
            </Button>
          </TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
    <AlertDialog 
      open={openDialog} 
      task={taskRemoving} 
      onClose={() => setOpenDialog(false)}
      onRemoveTask={onRemoveTask}
    />
  </TableContainer>
}

export default DataTable