/**
 * Define a reactive property on an Object
 */
export default ({target, listener}) => {
  const handler = {
    get (target, key, receiver) {
      var value = Reflect.get(target, key, receiver)

      if (//!(typeof value === 'object' && !!value && value.hasOwnProperty('__ob__')) &&
        Array.isArray(value) ||
        Object.prototype.toString.call(value) == '[object Object]' && Object.isExtensible(value)) {
        return Observe(value)
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

  function Observe(target) {
    // Object.defineProperty(target, '__ob__', {
    //   enumerable: false,
    //   writable: true,
    //   configurable: true
    // })
    return new Proxy(target, handler)
  }

  return observable
}
