let p1 = Promise.resolve(100);
let p2 = new Promise(resolve => {
    setTimeout(_ => {
        resolve(2)
    }, 1000)
});
let p3 = Promise.reject(3)
let p4 = Promise.reject(setTimeout(_ => {
    console.log(600);
}, 1000))
Promise.all([p1, p2, p4]).then(result => {
    console.log('成功' + result);
}).catch(reason => {
    console.log('失败' + reason); //  失败 3
})


Promise.all([p1, p2]).then(result => {
    console.log('成功' + result); //成功1,2
}).catch(reason => {
    console.log('失败' + reason);
})

Promise.race([p1, p2]).then(result => {
    console.log('成功' + result);
}).catch(reason => {
    console.log('失败' + reason);
})
Promise.race([p1, p3]).then(result => {
    console.log('成功1 ' + result);
}).catch(reason => {
    console.log('失败' + reason);
})