# Vue.nextTick()、vm.$nextTick([callback])

## Vue.$nextTick([callback,context])

- 参数：

  - `{Function}[callback]`
  - `{Object}[content]`

- 用法：

  - 在下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM

  所以就衍生了这个**获取更新后的DOM的Vue方法。**所以**放在Vue.nextTick()回调函数中的执行应该是会对DOM进行操作的js**代码；**理解：nextTick(),是将回调函数延迟在下一次DOM更新数据后调，**简单的理解是：**当数据更新了，在DOM中渲染后，自动执行该函数**

```js
<template>
  <div class="hello">
      <button id="firstBtn" @click="testClick()" ref="aa">{{testMsg}}</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      testMsg:"原始值",
    }
  },
  methods:{
    testClick:function(){
      let that=this;
      that.testMsg="修改后的值";
      console.log(that.$refs.aa.innerText);   //that.$refs.aa获取指定DOM，输出：原始值
    }
  }
}
</script>

//使用this.$nextTick()
methods:{
  testClick:function(){
    this.testMsg="修改后的值";
    this.$nextTick(function(){
      console.log(this.$refs.aa.innerText);  //输出：修改后的值
    });
  }
```



```js
//修改数据
vm.msg = 'Hello'
//DOM 还没有更新
Vue.nextTick(function() {
  //DOM更新了
})
//作为一个 Promise 使用（2.1.0 起新增，
Vue.nextTick()
	.then(function() {
  //DOM 更新了
})
```

**==注意：==**

Vue实现响应式并不是数据发生变化之后DOM立即变化，而不是按一定的策略进行DOM的更新。$nextTick()是在下次DOM更新循环结束之后执行回调，在修改数据之后使用`$nextTick`，则可以使用在回调中获取更新后的DOM

## Vm.$nextTick([callback])

- 参数：
  - `{Function} [callback]`
- 用法：
  - 将回调延迟到下次DOM更新循环之后。在修改数据之前立即使用它，然后等待DOM更新。它跟全局方法`Vue.nextTick`一样，不同的是回调的`this`自动绑定到调用它的实例上。



### 什么时候需要使用`Vue.nextTick([callback])`

1、Vue生命周期的**created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中,**原因是在created()钩子函数执行的时候DOM其实并未进行任何渲染，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该函数执行时所有的DOM挂载已完成。

```js
created() {
  this.$nextTick(_ => {//不使用 this.$nextTick()方法会报错
    this.$refs.aa.innerHTML = 'created中更改了按钮内容'//写入到DOM元素
  })
}
```

2、当项目中你想在**改变DOM元素的数据后**基于新的DOM做点什么，**对新DOM一系列的js操作都需要放进Vue.nextTick()的回调函数中;**通俗的理解是：更新数据后当你想立即使用js操作新的视图的时候需要使用它。vue改变dom元素结构后使用vue.$nextTick()方法来实现dom数据更新后延迟执行后续代码

3、在使用某个第三方插件时 ，希望在vue生成的某些dom动态发生变化时重新应用该插件，也会用到该方法，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法。

### <font color="gree">Vue.nextTick(callback)使用原理：</font>

#### <font color="green">异步更新队列</font>

原因是，Vue是异步执行Dom更新的。只要侦听到数据变化，Vue就会开启一个队列，并缓冲在同一个事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。然后，在下一个的事件循环"tick"中，Vue刷新队列并执行实际（已去重的）工作。Vue在内部对异步队列尝试使用原生的`Promise.then、MutationObserver和setImmediate`，如果执行环境不支持，则会采用`setTimeout(fn,0)`代替

因为 `$nextTick()` 返回一个 `Promise` 对象，所以你可以使用新的 [ES2017 async/await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 语法完成相同的事情：

```js
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent)//'未更新'
    await this.$nextTick()
    console.log(this.$el.textContent)//'已更新'
  }
}
```

