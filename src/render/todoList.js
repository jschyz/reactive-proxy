import { h } from 'virtual-dom'

export default (state) => {
  // is an array
  let todos = state.todos

  let toggleAll = h('input.toggle-all', {
    type: 'checkbox',
    onclick (event) {
      todos.forEach(todo => {
        todo.completed = event.target.checked
      })
    }
  })
  
  let elements = todos.map((todo, index) => {
    return h('li.todo', {}, [
      h('.view', {}, [
        h('input.toggle', {
          type: 'checkbox',
          checked: todo.completed
        }),
        h('label', {}, [todo.title]),
        h('button.destroy', {
          onclick () {
            todos = [...todos.slice(0, index), ...todos.slice(index + 1)]
          }
        })
      ]),
      h('input.edit', {type: 'text'})
    ])
  })

  return h('section.main', {
    style: 'display:' + ['none', 'block'][Number(!!todos.length)]
  }, [
    toggleAll,
    h('ul.todo-list', {}, elements)
  ])
}
