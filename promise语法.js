//  new Promise([executor])
// [executor] 执行函数是必传的
let p1 = new Promise((resolve, reject) => {
    setTimeout(_ => {
        if (Math.random() < 0.5) {
            reject('no')
            return
        }
        resolve('ok')
    }, 100)
});
// Promise.prototype.then([resolvedFn],[rejectdFn])
p1.then(result => {
    console.log(result);
}, reason => {
    console.log(reason);
})


//  1 2 3 成功100
let p2 = new Promise((resolve, reject) => {
    console.log(1);
    resolve(100);
    // resolve(console.log(10))
    console.log(2);
})
p2.then(result => {
    console.log('成功' + result);
}, reason => {
    console.log('失败' + reason);
})
console.log(3);