 /**
  * @name Observer
  * @description Define a reactive property on an Object
  * @type {Object}
  */
export default ({target, listener}) => {
  var observable

  /**
   * @name Observe
   * @description 深度的Proxy模式
   * @type {Object}
   */
  function Observe (target) {
    let proxy = new Proxy(target, handler)
    // __esProxy__ 不可枚举，用于代理缓存指针
    Object.defineProperty(target, '__esProxy__', {
      value: proxy,
      enumerable: false,
      writable: false,
      configurable: true
    })
    return proxy
  }

  const handler = {
    get (target, key, receiver) {
      var value = Reflect.get(target, key, receiver)

      // 通过判断__esProxy__，防止重复对数据Observe
      if (key === '__esProxy__') return value
      if (Array.isArray(value) || (Object.prototype.toString.call(value) === '[object Object]' && Object.isExtensible(value))) {
        if (value.hasOwnProperty('__esProxy__')) {
          return value['__esProxy__']
        } else {
          return Observe(value)
        }
      }

      return value
    },
    set (target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      // 触发监听
      listener(observable)
      return true
    }
  }

  return (observable = Observe(target))
}
