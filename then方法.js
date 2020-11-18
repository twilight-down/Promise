let p1 = new Promise((resolve, reject) => {
    resolve(100)
})
let p2 = p1.then(result => {
    console.log('成功' + result);
    return 200;
}, reason => {
    console.log('失败' + reason);
    return -10
});
let p3 = p2.then(result => {
    console.log('成功' + result);

}, reason => {
    console.log('失败' + reason);

});