# reactive-proxy

> 最近在深度学习Vue响应式设计原理，Vue是通过Object.defineProperty把对象上的属性全部转化为getter/setter，而ES6规范 Proxy（代理模式）也能对一个对象进行拦截访问getter/setter行为，而且功能更强大，那么是不是通过Proxy实现监听数据属性值对变动，实现数据响应呢？
>
> 此项目是对这想法一种尝试实践。

使用 Proxy 可以解决问题是：

- 数组更新监测不在受 Javascript 限制
  1. 当你利用索引直接设置一个项时，例如： `vm.items[indexOfItem] = newValue`
  2. 当你修改数组的长度时，例如： `vm.items.length = newLength`
  3. 能让数组变动方法，不需要添加变异方法去拦截


- 对象属性的添加或删除也同样不在受 Javascript 限制
- 不在需要遍历对象上的所有属性，只需对对象进行整体拦截
  ​

对比概括图

|            |                ES6 Proxy                 |          Object.defineProperty           |
| :--------- | :--------------------------------------: | :--------------------------------------: |
| 兼容性        | [caniuse](http://caniuse.com/#search=Proxy) |                   IE9+                   |
| 数组更新监测     |                    支持                    | 数组[变异方法](https://cn.vuejs.org/v2/guide/list.html#变异方法) |
| 对象属性的添加或删除 |                    支持                    | [变化检测问题](https://cn.vuejs.org/v2/guide/reactivity.html#变化检测问题) |



这个只是简单的响应式MVVM，基于 [ES6 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 和 [Virtual Dom](https://github.com/Matt-Esch/virtual-dom) 实现，并没有 Vue 的诸如指令、计算属性、过滤器…之类（膜拜尤大大）



### 运行

```
yarn
npm run start
```

![for example](https://cloud.githubusercontent.com/assets/3281438/23602334/0627dea0-028b-11e7-8b54-98cb2a77d24c.jpg)
