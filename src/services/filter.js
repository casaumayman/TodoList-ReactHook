const filterName = search => task => {
  return task
  .name
  .toUpperCase()
  .indexOf(search.toUpperCase()) !== -1
}

const filterStatus = filter => task => {
  return (filter === 0) || 
  (task.status && filter === 1) ||
  (!task.status && filter === 2)
}

export {
  filterName,
  filterStatus
}