/**
 * Define a reactive property on an Object
 */
export default ({target, listener}) => {
  let observable = new Proxy(target, {
    get (target, name) {
      return Object.freeze(target[name])
    },
    set (target, name, value) {
      target[name] = value
      listener(observable)
      return true
    }
  })

  return observable
};
