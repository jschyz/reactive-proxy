/**
 * @name filters
 * @description todos筛选方法集, 跟 visibility 相关
 * @type {Object}
 */
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

/**
 * @name filterTodos
 * @description todos筛选器
 * @type {Array}
 */
export function filterTodos (state) {
  return filters[state.visibility](state.todos)
}

/**
 * @name display
 * @description 控制节点隐藏或者显示
 * @type {String}
 */
export function display (expression) {
  return 'display:' + ['none', 'block'][Number(!!expression)]
}
