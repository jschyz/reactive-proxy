// virtual-dom
import { create, patch, diff } from 'virtual-dom'
// ES6 Proxy 实现 Observer
import observer from './observer'
// VNode (View)
import render from './render'
// localStorage
import storage from './storage'

// 数据状态 (Model)
let data = {
  newTodo: '',
  todos: storage.fetch(),
  editedTodo: null,
  visibility: 'all'
}

// 监听数据变动
const state = observer({
  target: data,
  listener (state) {
    const newTree = render(state)
    const patches = diff(tree, newTree)

    tree = newTree
    rootNode = patch(rootNode, patches)

    // watch todos change for localStorage persistence
    storage.save(state.todos)
  }
})

let tree = render(state)
let rootNode = create(tree)
window.state = state
// mount
document.querySelector('#app').appendChild(rootNode)

// hash 路由设置
window.addEventListener('hashchange', () => {
  let hash = window.location.hash.replace(/#\/?/, '')
  if (['all', 'active', 'completed'].indexOf(hash) >= 0) {
    state.visibility = hash
  } else {
    window.location.hash = ''
    state.visibility = 'all'
  }
})
// 自执行，加载触发事件
var event = new Event('hashchange')
window.dispatchEvent(event)
