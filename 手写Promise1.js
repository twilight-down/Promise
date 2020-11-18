// 基本实现Promise功能
class MyPromise {
    // 每一个实例都有一个状态和结果属性
    constructor(executor) {
        this.status = 'pending';
        this.value = 'undefiend';
        // 用来存储基于then指定（成功或失败）的方法
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
        // 我们判断处理 （没有方法的时候，我们让改变状态的操作延迟进行(让他变为异步任务 先执行.then )）
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
        this.resolveArr.push(resolveFn)
        this.rejectArr.push(rejectFn)


    }
}