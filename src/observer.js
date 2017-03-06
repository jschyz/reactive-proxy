 /**
  * @name Observer
  * @description Define a reactive property on an Object
  * @type {Object}
  */
export default ({target, listener}) => {
  var uid = 0
  var cache = {}
  var observable

  /**
   * @name Observe
   * @description 深度的Proxy模式
   * @type {Object}
   */
  function Observe (target) {
    // __esProxy__ 不可枚举，用于代理缓存指针
    Object.defineProperty(target, '__esProxy__', {
      value: ++uid,
      enumerable: false,
      writable: false,
      configurable: true
    })
    let proxy = new Proxy(target, handler)
    return proxy
  }

  const handler = {
    get (target, key, receiver) {
      var value = Reflect.get(target, key, receiver)

      // 通过判断__esProxy__，防止重复对数据Observe
      if (Array.isArray(value) || (Object.prototype.toString.call(value) === '[object Object]' && Object.isExtensible(value))) {
        let _uid
        let _cache

        // new Proxy 缓存设置
        _uid = value['__esProxy__']

        if (_uid) {
          _cache = cache[_uid]
        } else {
          _cache = Observe(value)
          cache[_cache['__esProxy__']] = _cache
        }

        return _cache
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
