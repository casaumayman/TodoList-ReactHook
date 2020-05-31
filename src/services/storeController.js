const store = {
  set: tasks => localStorage
    .setItem('tasks', JSON.stringify(tasks)),
  get: () => JSON.parse(localStorage.getItem('tasks'))
}

export default store