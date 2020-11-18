Promise.resolve(10).then(result => {
    console.log('成功' + result);
    return Promise.reject(result * 10)
}, reason => {
    console.log('失败' + reason);
}).then(result => {
    console.log('成功' + result);
}, reason => {
    console.log('失败' + reason);
})