/**
 * Define a reactive property on an Object
 */
export default ({target, listener}) => {
  var uid = 0
  var cache = {}

  const handler = {
    get (target, key, receiver) {
      var value = Reflect.get(target, key, receiver)

      // 通过判断__esProxy__，防止重复对数据Observe
      if ((Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]' && Object.isExtensible(value))) {
        let _uid = value['__esProxy__']
        let _cache

        if (!_uid) {
          _cache = Observe(value)
          cache[_cache['__esProxy__']] = _cache
        } else {
          _cache = cache[_uid]
        }
        return _cache
      }

      return value
    },
    set (target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      listener(observable)
      return true
    }
  }

  const observable = Observe(target)

  function Observe (target) {
    // __esProxy__ 不可枚举，代理缓存
    Object.defineProperty(target, '__esProxy__', {
      value: ++uid,
      enumerable: false,
      writable: false,
      configurable: true
    })
    let proxy = new Proxy(target, handler)
    return proxy
  }

  return observable
}
