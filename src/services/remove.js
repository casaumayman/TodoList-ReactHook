const removeTask = (tasks, updateTasks, enqueueSnackbar) => id => {
  let newTasks = tasks.filter(task => task.id !== id)
  updateTasks(newTasks)
  enqueueSnackbar('Xóa công việc thành công!', {
    variant: "success"
  })
}

export default removeTask