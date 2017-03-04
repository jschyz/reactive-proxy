import { h } from 'virtual-dom'

// ui component
import todo from './todo'
import todoList from './todoList'

export default (state) => {
  return h('.todoapp', {}, [todo(state), todoList(state)])
}
