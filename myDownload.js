let timer;
function analysisAPK() {
    if (timer) {
        clearTimeout(timer);
    }
    // 前端校验和查缓存
    this.status = this.validate();
    new apkDownload((resolve, reject) => {
        let that = this;
        API.group.getPackage({
            url: state.formData.download_url,
            mt_load: true
        }, res => {
            if (res.status === 0) {
                switch(res.data.process) {
                    case 'DONE':
                        resolve(res.msg);
                        break;
                    case 'INIT':
                        timer = setTimeout(function() {
                            new analysisAPK();
                            timer = void 0;
                        }, 1000);
                        break;
                }    
            }
        },error => {
            if (+error.status === 10900) {
                reject(error.msg)
            }
        })
    });
}
function apkDownload(constructor) {
    let that = this;
    this.value = void 0;
    this.reason = void 0;
    if (this.status !== 'PENDING') return;
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }

}

apkDownload.prototype.then = function(onFulfilled, onRejected) {
    let self=this;
    switch(self.status){
        case "resolved":
            onFullfilled(self.value);
            break;
        case "rejected":
            onRejected(self.reason);
            break;
        default:
    }
}

function created() {
    this.$watch('download_url', debounce((val) => {
        this.analysisApk();
    }, 500))
}

function debounce(func, delay) {
    let timer
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


