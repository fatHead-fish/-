
const fs = require('fs')
console.log('a');
// fs.readFile('./test.txt', (err, data) => {
//   console.log('c');
//   if (err) throw err//若是出错，则抛出错误
//   console.log(data.toString());
// })
let p = new Promise((resolve, reject) => {
  fs.readFile('./test.txt', 'utf-8', (err, data) => {
    console.log('c');
    if (err) reject(err)
    else resolve(data)
  })
})
p.then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})
console.log('b');