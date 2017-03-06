# reactive-proxy
这个只是简单的响应式MVVM，基于 [ES6 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 和 [Virtual Dom](https://github.com/Matt-Esch/virtual-dom) 实现，并没有 Vue 的诸如指令、计算属性、过滤器...之类

#### 对比

下列图表是监听对象属性值的变化对比图

|           | ES6 Proxy | Object.defineProperty |
| :-------- | :--------:| :-------------------: |
| 兼容性     | [caniuse](http://caniuse.com/#search=Proxy) |  IE9+   |
| 数组更新监测|   支持     |  数组[变异方法](https://cn.vuejs.org/v2/guide/list.html#变异方法)  |
| 对象属性的添加或删除|支持 |  [变化检测问题](https://cn.vuejs.org/v2/guide/reactivity.html#变化检测问题)  |

#### 运行

```
yarn
npm run start
```

![for example](https://cloud.githubusercontent.com/assets/3281438/23602334/0627dea0-028b-11e7-8b54-98cb2a77d24c.jpg)
