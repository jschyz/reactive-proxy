import { h } from 'virtual-dom'

// VNode:ui component
import todo from './todo'
import todoList from './todoList'
import overview from './overview'

export default (state) => {
  return h('.todoapp', [todo(state), todoList(state), overview(state)])
}
