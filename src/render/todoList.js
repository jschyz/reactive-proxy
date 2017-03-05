import { h } from 'virtual-dom'
import { filterTodos, display } from './helper'

export default (state) => {
  // is an array
  let todos = filterTodos(state)

  // VNode: todo list
  let elements = todos.map((todo, index) => {
    let beforeEditCache

    return h('li.todo', { className: (todo.completed ? ' completed' :  '') + (state.editedTodo == todo ? ' editing' : '') }, [
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
          // 双击编辑editTodo(todo)
          ondblclick () {
            beforeEditCache = todo.title
            state.editedTodo = todo
          }
        }, [todo.title]),
        h('button.destroy', {
          // 移除 todo
          onclick () {
            state.todos.splice(index, 1)
          }
        })
      ]),
      // VNode: input.done
      h('input.edit', {
        type: 'text',
        value: todo.title,
        onkeyup (event) {
          // 完成编辑
          if (event.keyCode == 13) {
            if (!state.editedTodo) return

            state.editedTodo = null
            todo.title = todo.title.trim()
            if (!todo.title) {
              state.todos.splice(index, 1)
            }
          }
          // 取消编辑
          else if (event.keyCode == 27) {
            state.editedTodo = null
            todo.title = beforeEditCache
          }
        },
        onblur () {
          state.editedTodo = null
          todo.title = beforeEditCache
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
