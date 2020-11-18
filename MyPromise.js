// 基本实现Promise功能
// class MyPromise {
//     // 每一个实例都有一个状态和结果属性
//     constructor(executor) {
//         this.status = 'pending';
//         this.value = 'undefiend';
//         // 用来存储基于then指定的成功或失败的方法
//         this.resolveArr = [];
//         this.rejectArr = [];

//         //定义resolve/和reject方法用来改变Promise实例的状态和结果 
//         let change = (status, value) => {
//             // 状态一旦改变，再改变则无效
//             if (this.status !== 'pending') return;
//             // 这里的this是上下文里面的this 箭头函数没有this
//             this.status = status
//             this.value = value

//             // 改变状态完成后，把基于then指定的对应方法执行
//             let fnArr = status === "resolved" ? this.resolveArr : this.rejectArr;
//             fnArr.forEach(item => {
//                 if (typeof item !== 'function') return;
//                 item(this.value);
//             })
//         }

//         // 为了保证执行resolve或者reject的时候，已经通过then把需要执行的方法弄好了，
//         // 我们判断处理 （没有方法的时候，我们让改变状态的操作延迟进行）
//         let resolve = result => {
//             if (this.resolveArr.length > 0) {
//                 change('resolved', result);
//                 return
//             }

//             // 延迟是为了让then先执行 获取到函数
//             let delayTimer = setTimeout(_ => {
//                 change('resolved', result);
//                 clearTimeout(delayTimer)
//             }, 0)
//         };

//         let reject = reason => {
//             if (this.rejectArr.length > 0) {
//                 change('rejected', reason)
//                 return
//             }
//             let delayTimer = setTimeout(_ => {
//                 change('rejected', reason);
//                 clearTimeout(delayTimer)
//             }, 0)
//         };

//         // 异常捕获
//         try {
//             // 每一次创建Promise实例都会立即执行executor函数
//             executor(resolve, reject);
//         } catch (err) {
//             reject(err.message)
//         }
//     }

//     // 就相当于在Mypromise.prototype上添加的then方法
//     // MyPromise.prototype.then
//     then(resolveFn, rejectFn) {
//         // 每一次.then都会返回一个新的Promise实例
//         // (实现了.then 的链式写法)
//         this.resolveArr.push(resolveFn)
//         this.rejectArr.push(rejectFn)

//         
//     }
// }


// 实现then的链式调用 
// class MyPromise {
//     // 每一个实例都有一个状态和结果属性
//     constructor(executor) {
//         this.status = 'pending';
//         this.value = 'undefiend';
//         // 用来存储基于then指定的成功或失败的方法
//         this.resolveArr = [];
//         this.rejectArr = [];

//         //定义resolve/和reject方法用来改变Promise实例的状态和结果 
//         let change = (status, value) => {
//             // 状态一旦改变，再改变则无效
//             if (this.status !== 'pending') return;
//             // 这里的this是上下文里面的this 箭头函数没有this
//             this.status = status
//             this.value = value

//             // 改变状态完成后，把基于then指定的对应方法执行
//             let fnArr = status === "resolved" ? this.resolveArr : this.rejectArr;
//             fnArr.forEach(item => {
//                 if (typeof item !== 'function') return;
//                 item(this.value);
//             })
//         }

//         // 为了保证执行resolve或者reject的时候，已经通过then把需要执行的方法弄好了，
//         // 我们判断处理 （没有方法的时候，我们让改变状态的操作延迟进行）
//         let resolve = result => {
//             if (this.resolveArr.length > 0) {
//                 change('resolved', result);
//                 return
//             }

//             // 延迟是为了让then先执行 获取到函数
//             let delayTimer = setTimeout(_ => {
//                 change('resolved', result);
//                 clearTimeout(delayTimer)
//             }, 0)
//         };

//         let reject = reason => {
//             if (this.rejectArr.length > 0) {
//                 change('rejected', reason)
//                 return
//             }
//             let delayTimer = setTimeout(_ => {
//                 change('rejected', reason);
//                 clearTimeout(delayTimer)
//             }, 0)
//         };

//         // 异常捕获
//         try {
//             // 每一次创建Promise实例都会立即执行executor函数
//             executor(resolve, reject);
//         } catch (err) {
//             reject(err.message)
//         }
//     }

//     // 就相当于在Mypromise.prototype上添加的then方法
//     // MyPromise.prototype.then
//     then(resolveFn, rejectFn) {
//         // 每一次.then都会返回一个新的Promise实例
//         // (实现了.then 的链式写法)
//         return new MyPromise((resolve, reject) => {
//             // 只要执行新的resolve或reject就能知道新的实例是成功还是失败

//             this.resolveArr.push(result => {
//                 try {
//                     // 不报错，则接受方法返回的结果 会根据结果判断成功还是失败
//                     let x = resolveFn(result)
//                     if (x instanceof MyPromise) {
//                         x.then(resolve, reject)
//                         return
//                     }
//                     resolve(x)
//                 } catch (err) {
//                     // 方法执行报错 也代表新实例是失败的
//                     reject(err.message)
//                 }

//             })
//             this.rejectArr.push(reason => {
//                 try {
//                     // 不报错，则接受方法返回的结果 会根据结果判断成功还是失败
//                     let x = rejectFn(reason)
//                     if (x instanceof MyPromise) {
//                         x.then(resolve, reject)
//                         return
//                     }
//                     resolve(x)
//                 } catch (err) {
//                     // 方法执行报错 也代表新实例是失败的
//                     reject(err.message)
//                 }
//             })
//         });
//     }
// }



// 实现只传一个函数或两个的解决办法
class MyPromise {
    // 每一个实例都有一个状态和结果属性
    constructor(executor) {
        this.status = 'pending';
        this.value = 'undefiend';
        // 用来存储基于then指定的成功或失败的方法
        this.resolveArr = [];
        this.rejectArr = [];

        //定义resolve/和reject方法用来改变Promise实例的状态和结果 
        let change = (status, value) => {
            // 状态一旦改变，再改变则无效
            if (this.status !== 'pending') return;
            // 这里的this是上下文里面的this 箭头函数没有this
            this.status = status
            this.value = value

            // 改变状态完成后，把基于then指定的对应方法执行
            let fnArr = status === "resolved" ? this.resolveArr : this.rejectArr;
            fnArr.forEach(item => {
                if (typeof item !== 'function') return;
                item(this.value);
            })
        }

        // 为了保证执行resolve或者reject的时候，已经通过then把需要执行的方法弄好了，
        // 我们判断处理 （没有方法的时候，我们让改变状态的操作延迟进行）
        let resolve = result => {
            if (this.resolveArr.length > 0) {
                change('resolved', result);
                return
            }

            // 延迟是为了让then先执行 获取到函数
            let delayTimer = setTimeout(_ => {
                change('resolved', result);
                clearTimeout(delayTimer)
            }, 0)
        };

        let reject = reason => {
            if (this.rejectArr.length > 0) {
                change('rejected', reason)
                return
            }
            let delayTimer = setTimeout(_ => {
                change('rejected', reason);
                clearTimeout(delayTimer)
            }, 0)
        };

        // 异常捕获
        try {
            // 每一次创建Promise实例都会立即执行executor函数
            executor(resolve, reject);
        } catch (err) {
            reject(err.message)
        }
    }

    // 就相当于在Mypromise.prototype上添加的then方法
    // MyPromise.prototype.then
    then(resolveFn, rejectFn) {

        // 如果传递的参数不是函数（NUll/不传递），我们让成功或失败顺延

        if (typeof resolveFn !== 'function') {
            resolveFn = result => {
                return result;
            };
        }
        if (typeof rejectFn !== 'function') {
            rejectFn = reason => {
                return MyPromise.reject(reason)
            }
        }



        // 每一次.then都会返回一个新的Promise实例
        // (实现了.then 的链式写法)
        return new MyPromise((resolve, reject) => {
            // 只要执行新的resolve或reject就能知道新的实例是成功还是失败

            this.resolveArr.push(result => {
                try {
                    // 不报错，则接受方法返回的结果 会根据结果判断成功还是失败
                    let x = resolveFn(result)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                        return
                    }
                    resolve(x)
                } catch (err) {
                    // 方法执行报错 也代表新实例是失败的
                    reject(err.message)
                }

            })
            this.rejectArr.push(reason => {
                try {
                    // 不报错，则接受方法返回的结果 会根据结果判断成功还是失败
                    let x = rejectFn(reason)
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                        return
                    }
                    resolve(x)
                } catch (err) {
                    // 方法执行报错 也代表新实例是失败的
                    reject(err.message)
                }
            })
        });

    }

    // MyPromise.prototype.catch(Fn) ==== MyPromise.prototype.then(null,fn)
    catch (rejectFn) {
        return this.then(null, rejectFn)
    }

    // 静态方法
    static resolve(result) {
        return new MyPromise((resolve) => {
            resolve(result)
        })
    }
    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason);
        })
    }

    static all(arr) {
        return new MyPromise((resolve, reject) => {
            let index = 0,
                results = [];
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (!(item instanceof MyPromise)) continue;
                item.then(result => {
                    index++;
                    results[i] = result
                    if (index === arr.length) {
                        resolve(result);
                    }
                }).catch(reason => {
                    // 只要有一个失败 整体就是失败
                    reject(reason)
                })
            }

        })
    }

}