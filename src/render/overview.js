import { h } from 'virtual-dom'
import { filters, display } from './helper'

/**
 * @name overview
 * @description UI Component: todo 概览
 * @action 任务筛选 清除已完成任务
 * @type {Function}
 */
export default (state) => {
  let todos = state.todos
  // computed: 为选中个数
  let remaining = todos.filter(todo => !todo.completed).length

  // VNode: ul.filters
  let elements = Object.keys(filters).map(key => {
    return h('li', [
      h('a', {
        href: `#/${key}`,
        className: state.visibility === key ? 'selected' : ''
      },
      // 首字母大写
      [key.replace(/\b(\w)|\s(\w)/g, first => first.toUpperCase())])
    ])
  })

  return h('footer.footer', { style: display(todos.length) }, [
    // VNode: span
    h('span.todo-count', [
      h('strong', [remaining]),
      (remaining === 1 ? ' item' : ' items') + ' left'
    ]),
    // VNode: ul
    h('ul.filters', elements),
    // VNode: button
    h('button.clear-completed', {
      style: display(todos.length - remaining),
      onclick () {
        todos.forEach((todo, index) => {
          if (todo.completed) todos.splice(index, 1)
        })
      }
    }, ['Clear completed'])
  ])
}
