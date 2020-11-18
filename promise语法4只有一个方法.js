Promise.reject(10).then(result => {
    console.log('成功' + result);
    return result * 10
}).then(null, reason => {
    console.log('失败' + reason);
})