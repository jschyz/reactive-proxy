// todos 过滤器, 跟 visibility 相关
export const filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

// computed
export function filterTodos (state) {
  return filters[state.visibility](state.todos)
}

//
export function display (expression) {
  return 'display:' + ['none', 'block'][Number(!!expression)]
}
