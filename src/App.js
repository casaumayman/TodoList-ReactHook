import React, { useState, useEffect } from 'react'
import { Container, Grid, Button, makeStyles } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import {
  Title, FormSave, ActionControl, DataTable
} from './components'

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
      let list = JSON.parse(localStorage.getItem('tasks'))
      setTasks(list)
    }
  }, [])
  const updateTasks = tasks => {
    setTasks(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
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
    } else {
      task.id = tasks.length + 1
      newTasks = [{ ...task }, ...newTasks]
    }
    updateTasks(newTasks)
    onCloseForm()
  }
  const removeTask = id => {
    let newTasks = tasks.filter(task => task.id !== id)
    updateTasks(newTasks)
  }
  const handleAction = ({ filter, search }) => {
    setSearch(search)
    setFilter(filter)
  }

  const comparer = (a, b) => {
    if (!sort) return 0
    if (sort === 1) {
      if (a.status && !b.status) return 1
      if (!a.status && b.status) return -1
      return 0
    } else {
      if (a.status && !b.status) return -1
      if (!a.status && b.status) return 1
    }
  }

  let taskList = tasks
    .filter(task => (filter === 0) || 
      (task.status && filter === 1) ||
      (!task.status && filter === 2)
    )
    .filter(task => task
      .name
      .toUpperCase()
      .indexOf(search.toUpperCase()) !== -1
    )
    .sort(comparer)
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
            onRemoveTask={removeTask}
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
