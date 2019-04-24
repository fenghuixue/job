//  Promise实现ajax

let getJson = function(url) {
    return new Promise((resolve, reject) => {
        let client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = () => {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status == 200) { 
                resolve(this.response);
            } else {
                reject(new Error(this.statusText))
            }
        };
        client.responseType = 'JSON';
        client.sendRequestHeader('Accept', 'application/json');
        client.send();
    });
}

getJson('/post.json').then((res) => {
    // 成功
}, (error) => {
    // 失败
});


// javascript实现 ajax
let xhr = createXHR();
xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (xhr.status == 200) {
            alert(xhr.responseText);
        } else {
            alert('error' + xhr.status);
        }
    }
}

xhr.open('get', url, true); //第三个参数代表是否异步 false 为非异步
xhr.send();

// axios封装ajax

const instance = axios.create({
    baseUrl: url,
    transformRequest: [function(data) {
        // 目地， post请求会弄丢空数组
        return qs.stringify(data)
    }],
    header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Request-With': 'XHttpRequest'
    },
    paramsSerializer(data) {
        data = {...data, _:newDate()}
        return qs.stringify(data)
    }
})
