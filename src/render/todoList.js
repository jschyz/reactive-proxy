import { h } from 'virtual-dom'
import { filterTodos, display } from './helper'

/**
 * @name todoList
 * @description UI Component: todo list
 * @action 完成任务 双击编辑任务 删除任务
 * @type {Function}
 */
export default (state) => {
  // is an array
  // based on the hash
  var todos = filterTodos(state)

  /**
   * @name done
   * @description 完成任务编辑工作
   * @type {Function}
   */
  function done (todo, index) {
    if (!state.editedTodo) return

    state.editedTodo = null
    todo.title = todo.title.trim()
    if (!todo.title) {
      todos.splice(index, 1)
    }
  }
  /**
   * @name cancel
   * @description 取消任务编辑工作
   * @type {Function}
   */
  function cancel (todo) {
    state.editedTodo = null
    todo.title = state.beforeEditCache
  }
  // VNode: <li v-for=""></li>
  var elements = todos.map((todo, index) => {
    // ClassList: [completed, editing]
    return h('li.todo', {className: (todo.completed ? ' completed' : '') + (state.editedTodo === todo ? ' editing' : '')}, [
      // VNode: input[text]
      h('.view', [
        h('input.toggle', {
          type: 'checkbox',
          checked: todo.completed,
          onclick: event => (todo.completed = event.target.checked)
        }),
        h('label', {
          ondblclick (event) {
            // 双击编辑，并获取焦点
            state.beforeEditCache = todo.title
            state.editedTodo = todo
            event.target.parentNode.nextElementSibling.focus()
          }
        }, [todo.title]),
        h('button.destroy', {
          onclick () {
            // 移除 todo
            todos.splice(index, 1)
          }
        })
      ]),
      // VNode: input.done
      h('input.edit', {
        type: 'text',
        value: todo.title,
        oninput: event => (todo.title = event.target.value),
        onkeyup (event) {
          if (event.keyCode === 13) done(todo, index)
          else if (event.keyCode === 27) cancel(todo)
        },
        onblur: () => done(todo, index)
      })
    ])
  })

  return h('section.main', { style: display(todos.length) }, [
    // VNode: toggle-all
    h('input.toggle-all', {
      type: 'checkbox',
      onclick: event => todos.forEach(todo => (todo.completed = event.target.checked))
    }),
    // VNode: todo-list
    h('ul.todo-list', {}, elements)
  ])
}
