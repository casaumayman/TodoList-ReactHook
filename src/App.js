import React, { useState, useEffect } from 'react'
import { Container, Grid, Button, makeStyles } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import {
  Title, 
  FormSave, 
  ActionControl, 
  DataTable
} from './components'
import { useSnackbar } from 'notistack'
import comparer from './services/sort'
import removeTask from './services/remove'
import { filterName, filterStatus } from './services/filter'
import store from './services/storeController'

const useStyles = makeStyles(theme => ({
  btnAdd: {
    margin: theme.spacing(1),
  }
}))

const App = () => {
  const classes = useStyles()
  const [openForm, setOpenForm] = useState(false)
  const [tasks, setTasks] = useState([])
  const [taskEditing, setTaskEditing] = useState({})
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(0)
  const [sort, setSort] = useState(0)
  const { enqueueSnackbar } = useSnackbar()

  const onOpenForm = (task) => {
    if (!task.id) {
      setTaskEditing({})
    } else {
      setTaskEditing(task)
    }
    setOpenForm(true)
  }
  const onCloseForm = () => {
    setOpenForm(false)
  }
  useEffect(() => {
    if (localStorage && localStorage.getItem('tasks')) {
      let list = store.get()
      setTasks(list)
    } else {
      enqueueSnackbar('Trình duyệt không hỗ trợ web stored!', {
        variant: 'error'
      })
    }
  }, [enqueueSnackbar])
  const updateTasks = tasks => {
    setTasks(tasks)
    store.set(tasks)
  }
  const onSaveTask = task => {
    let newTasks = [...tasks]
    if (task.id) {
      let index = -1
      tasks.forEach((taskItem, i) => {
        if (taskItem.id === task.id)
          index = i
      })
      if (index === -1) return
      newTasks[index] = { ...task }
      enqueueSnackbar('Cập nhật công việc thành công!', {
        variant: "success"
      })
    } else {
      task.id = tasks.length + 1
      newTasks = [{ ...task }, ...newTasks]
      enqueueSnackbar('Tạo mới công việc thành công!', {
        variant: "success"
      })
    }
    updateTasks(newTasks)
    onCloseForm()
  }
  const handleAction = ({ filter, search }) => {
    setSearch(search)
    setFilter(filter)
  }

  let taskList = tasks
    .filter(filterStatus(filter))
    .filter(filterName(search))
    .sort(comparer(sort))
  return (
    <Container>
      <Title />
      <Grid container>
        {openForm && <Grid item xs={4}>
          <FormSave
            onCloseForm={onCloseForm}
            taskEditing={taskEditing}
            onSaveTask={onSaveTask}
          />
        </Grid>}
        <Grid item xs={openForm ? 8 : 12}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            className={classes.btnAdd}
            color="primary"
            onClick={() => onOpenForm('create')}
          >
            Thêm công việc
          </Button>
          <ActionControl
            handleAction={handleAction}
            search={search}
            filter={filter}
          />
          <DataTable
            tasks={taskList}
            onRemoveTask={removeTask(tasks, updateTasks, enqueueSnackbar)}
            onOpenForm={onOpenForm}
            onSort={() => setSort(s => (s + 1) % 3)}
            sort={sort}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
