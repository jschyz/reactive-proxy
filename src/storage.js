// localStorage 存储 todos
const STORAGE_KEY = 'es6-proxy'

export default {
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (todos) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
