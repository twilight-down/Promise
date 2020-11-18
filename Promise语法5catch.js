Promise.resolve(10).then(result => {
    console.log(a); //报错
}).catch(reason => {
    console.log('失败' + reason);
})