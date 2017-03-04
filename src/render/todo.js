import { h, diff } from 'virtual-dom'

export default (state) => {
  return h('header', {}, [
    h('h1', {}, 'todos'),
    h('input.new-todo', {
      type:'text',
      autofocus: 'autofocus',
      autocomplete: false,
      placeholder: 'What needs to be done?',
      value: state.newTodo,
      oninput (event) {
        state.newTodo = event.target.value
      },
      onkeyup (event) {
        if (event.keyCode !== 13) return;

        if (state.newTodo) {
            state.todos = [...state.todos, {
              title: state.newTodo,
              completed: false
            }]
            state.newTodo = ''
        }
      }
    })
  ])
}
