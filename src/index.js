// virtual-dom
import { create, patch, diff } from 'virtual-dom'
// ES6 Proxy 实现 Observer
import observer from './observer'
// VNode (View)
import render from './render'

// 数据状态 (Model)
let data = {
  newTodo: '',
  todos: []
};

// 监听数据变动
const state = observer({
  target: data,
  listener (state) {
    const newTree = render(state)
    const patches = diff(tree, newTree)

    tree = newTree
    rootNode = patch(rootNode, patches)
  }
})

let tree = render(state)
let rootNode = create(tree)

document.querySelector('#app').appendChild(rootNode)
