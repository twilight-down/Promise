function ajax1() {
    return new Promise((resolve, reject) => {

    });
}

function ajax2() {
    return new Promise((resolve, reject) => {

    });
}

function ajax3() {
    return new Promise((resolve, reject) => {

    });
}
// .then
ajax1().then(result => {
    return ajax2(result.map(item => item.id))
}).then(result => {
    return ajax3();
}).then(result => {})

// async await 语法糖
async function handle() {
    let result = await ajax1()
    result = await ajax2(result.map(item => item.id))
    result = await ajax3()

}