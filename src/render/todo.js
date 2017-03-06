import { h } from 'virtual-dom'

/**
 * @name todo
 * @description UI Component: new todo
 * @action 添加新任务
 * @type {Function}
 */
export default (state) => {
  return h('header', {}, [
    h('h1', {}, 'todos'),
    h('input.new-todo', {
      type: 'text',
      autofocus: 'autofocus',
      autocomplete: false,
      placeholder: 'What needs to be done?',
      value: state.newTodo,
      oninput: event => (state.newTodo = event.target.value),
      onkeyup (event) {
        // 回车添加任务
        if (event.keyCode !== 13) return

        if (state.newTodo) {
          state.todos.push({
            title: state.newTodo,
            completed: false
          })
          state.newTodo = ''
        }
      }
    })
  ])
}
