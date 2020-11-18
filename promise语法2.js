new Promise(resolve => {
    resolve('a');

}).then(result => {
    console.log('成功' + result);
    return result * 10
}, reason => {
    console.log('失败' + reason); //失败ReferenceError: a is not defined
}).then(result => {
    console.log('成功' + result); //成功undefined
}, reason => {
    console.log('失败' + reason);
})