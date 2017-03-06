// localStorage 存储 todos
const STORAGE_KEY = 'es6-proxy'

/**
 * @name storage
 * @description 本地存储 todos
 * @type {Object}
 */
export default {
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save: function (todos) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
