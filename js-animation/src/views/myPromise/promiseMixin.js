/**
 * @file 给Promise原型上挂载 some方法
 */
export default function promiseMixin() {
    Promise.prototype.some = arr => {
        return new Promise((resolve, reject) => {
            let res_num = 0, reject_num = 0, result = [];
            arr.map(item => {
                item.then((res) => {
                    res_num++;
                    result.push(res);
                    if (res_num == arr.length) {
                        // 所有请求都成功
                        resolve(1);
                    } else if (res_num + reject_num == arr.length) {
                        // 非所有请求都成功或者都失败
                        reject(result);
                    }
                }, (err) => {
                    reject_num++;
                    result.push(err);
                    if (res_num == arr.length) {
                        // 所有请求都失败
                        resolve(0);
                    } else if (res_num + reject_num == arr.length) {
                        // 非所有请求都成功或者都失败
                        reject(result);
                    }
                })
            });
        });
    }
}