function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path,'utf-8',(data, err) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
mineReadFile('./test.txt')
  .then(value => {
  console.log(value);
  }, reason => {
    console.log(reason);
}) 