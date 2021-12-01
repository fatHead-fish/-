# 实现instanceof

```js
function instance(a,b) {
  const proto = a.__proto__
  if(proto) {
    if(proto === b.prototype) return true
    else return instance(proto,b)
  }else return false
}
```

