class Promise {
  // 构造方法
  constructor(executor) {
    // 添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.callbacks = []
    // 保存实例对象的 this 值
    const self = this
    // resolve 函数
    function resolve(data) {
      // 保证状态只能被修改一次
      if (self.PromiseState !== 'pending') return;
      // 1、修改对象的状态 (promiseState)
      self.PromiseState = 'fulfilled'
      // 2、设置对象结果值 (promiseResult)
      self.PromiseResult = data
      // 调用成功的回调函数
      setTimeout(_ => {
        self.callbacks.forEach(item => {
          item.onResolved(data)
        })
      })
    }
    // reject 函数
    function reject(data) {
      // 保证状态只能被修改一次
      if (self.PromiseState !== 'pending') return;
      // 1、修改对象的状态 (promiseState)
      self.PromiseState = 'rejected'
      // 2、设置对象结果值 (promiseResult)
      self.PromiseResult = data
      // 调用失败的回调函数
      setTimeout(_ => {
        self.callbacks.forEach(item => {
          item.onReject(data)
        })
      })
    }
    try {
      //同步调用 【执行器函数】
      executor(resolve, reject)
    } catch (e) {
      reject(e) 
    }
  }
  // then方法
  then(onResolved, onReject) {
    const self = this
    //判断回调函数参数
    if (typeof onReject !== 'function') {
      onReject = reason => {
        throw reason
      }
    }
    if (typeof onResolved !== 'function') {
      onResolved = value => value
    }
    return new Promise((resolve, reject) => {
      //封装函数
      function callback(methodType) {
        try {
          const result = methodType(self.PromiseResult)
          //判断
          if (result instanceof Promise) {//如果是 Promise 类型的对象
            result.then(v => {resolve(v)},r => {reject(r)})
          } else {
            resolve(result)//结果的对象 状态为【成功】
          }
        }catch(e) {
          reject(e)
        }
      }
      //调用回调函数 PromiseState
      if (this.PromiseState === 'fulfilled') {
        setTimeout(_ => {
          callback(onResolved)
        })
      }
      if (this.PromiseState === 'rejected') {
        setTimeout(_ => {
          callback(onReject)
        })
      }
      // 判断 pending 状态
      if (this.PromiseState === 'pending') {
        //保存回调函数
        this.callbacks.push({
          onResolved: function() {
            callback(onResolved)
          },
          onReject: function() {
            callback(onReject)
          }
        })
      }
    })
  }
  // catch方法
  catch(onReject) {
    return this.then(undefined,onReject)
  }
  // resolve 方法
  static resolve(value) {
    //返回 promsie 对象
    return new Promise((resolve, reject) => {
      // 判断是不是 promise 对象
      if(value instanceof Promise) {
        value.then( v=> {resolve(v)},r => {reject(r)})
      } else {
        // 状态设置为成功
        resolve(value)
      }
    })
  }
  // reject 方法
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  // all方法
  static all(promises) {
    //返回结果为 promise 对象
    return new Promise((resolve, reject) => {
      //声明变量
      let count = 0
      let arr = []
      //遍历
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          // 得知对象的状态是成功的
          //每个promise对象 都是成功的
          count++
          // 将当前 promise 对象成功的结果 存入到数组中
          arr[i] = v
          if (count === promises.length) {
            resolve(arr)//修改状态
          }
        }, r => {
          reject(r)
        })
      }
    }) 
  }
  // race方法
  static race(promises) {
    return new Promise((resolve, rejetc) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          // 修改返回对象的状态为 [成功]
          resolve(v)
        }, r => {
          // 修改返回对象的状态为 [失败]
          rejetc(r)
        })
      }
    })
  }
}