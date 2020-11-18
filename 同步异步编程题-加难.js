// 1 5  3 4 10 2 7 8 9
// 1 5 3 10  4 7 8 9 2
console.log(1);
setTimeout(_ => { console.log(2); }, 1000)
async function fn() {
    console.log(3);
    setTimeout(_ => { console.log(4); }, 20);
    return Promise.reject()
}
async function run() {
    console.log(5);
    await fn();
    console.log(6);
}
run()
    // console.time()  65ms
for (let i = 0; i < 90000000; i++) {}
// console.timeEnd()
setTimeout(_ => {
    console.log(7);
    new Promise(resolve => {
        console.log(8);
        resolve();
    }).then(_ => { console.log(9); });
}, 0);
console.log(10);