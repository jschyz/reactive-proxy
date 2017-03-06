import { h } from 'virtual-dom'
import { filterTodos, display } from './helper'

export default (state) => {
  // is an array
  // based on the hash
  let todos = filterTodos(state)


  // 完成编辑
  let done = todo => {
    if (!state.editedTodo) return

    state.editedTodo = null
    todo.title = todo.title.trim()
    if (!todo.title) {
      todos.splice(index, 1)
    }
  }
  // 取消编辑
  let cancel = todo => {
    state.editedTodo = null
    todo.title = state.beforeEditCache
  }
  // VNode: todo list
  let elements = todos.map((todo, index) => {
    return h('li.todo', {className: (todo.completed ? ' completed' : '') + (state.editedTodo == todo ? ' editing' : '')}, [
      // VNode: input[text]
      h('.view', [
        h('input.toggle', {
          type: 'checkbox',
          checked: todo.completed,
          onclick (event) {
            todo.completed = event.target.checked
          }
        }),
        h('label', {
          // 双击编辑，并获取焦点
          ondblclick (event) {
            state.beforeEditCache = todo.title
            state.editedTodo = todo
            event.target.parentNode.nextElementSibling.focus()
          }
        }, [todo.title]),
        h('button.destroy', {
          // 移除 todo
          onclick () {
            todos.splice(index, 1)
          }
        })
      ]),
      // VNode: input.done
      h('input.edit', {
        type: 'text',
        value: todo.title,
        oninput (event) {
          todo.title = event.target.value
        },
        onkeyup (event) {
          if (event.keyCode === 13) done(todo)
          else if (event.keyCode === 27) cancel(todo)
        },
        onblur () {
          done(todo)
        }
      })
    ])
  })

  return h('section.main', { style: display(todos.length) }, [
    // VNode: toggle-all
    h('input.toggle-all', {
      type: 'checkbox',
      onclick (event) {
        todos.forEach(todo => {
          todo.completed = event.target.checked
        })
      }
    }),
    // VNode: todo-list
    h('ul.todo-list', {}, elements)
  ])
}
