const comparer = sort => (a, b) => {
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

export default comparer