let p1 = Promise.resolve(100);
let p2 = new Promise(resolve => {
    setTimeout(_ => {
        resolve(200)
    }, 1000)
});
let p3 = Promise.reject(3)

async function fn() {
    console.log(1);
    // await 会等待当前promise返回的结果，只有当返回结果是resolvd情况 才会赋值给result
    let result2 = await p2;
    console.log(result2);

    let result1 = await p1;
    console.log(result1);

}
fn();
console.log(2);


async function fn() {
    let reason = await p3;
    console.log(reason);
    console.log(1);
}