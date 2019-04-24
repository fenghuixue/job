// let components = [{
// 	"type": "1",
// 	"style": "1",
// 	"name": "\u56fe\u7247\u5185\u5bb9-1",
// 	"width": "1280",
// 	"height": "720",
// 	"size": "200",
// 	"pos_x": "0",
// 	"pos_y": "0",
// 	"pos_width": "1280",
// 	"pos_height": "720",
// 	"sign": "c4ca4238a0b923820dcc509a6f75849b",
// 	"mime": {
// 		"jpg": "image\/jpeg",
// 		"png": "image\/png",
// 		"gif": "image\/gif",
// 		"webp": "application\/octet-stream"
// 	}
// }, {
// 	"type": "4",
// 	"style": "3",
// 	"name": "\u6807\u9898-1",
// 	"length": "30",
// 	"pos_x": "0",
// 	"pos_y": "0",
// 	"pos_width": "0",
// 	"pos_height": "0",
// 	"sign": "a87ff679a2f3e71d9181a67b7542122c"
// }, {
// 	"type": "5",
// 	"style": "3",
// 	"name": "\u63cf\u8ff0-1",
// 	"length": "100",
// 	"pos_x": "0",
// 	"pos_y": "0",
// 	"pos_width": "0",
// 	"pos_height": "0",
// 	"sign": "e4da3b7fbbce2345d7772b0674a318d5"
// }, {
// 	"type": "7",
// 	"style": "6",
// 	"name": "\u8df3\u8f6c\u6309\u94ae-1",
// 	"pos_x": "0",
// 	"pos_y": "0",
// 	"pos_width": "0",
// 	"pos_height": "0",
// 	"sign": "8f14e45fceea167a5a36dedd4bea2543"
// }, {
// 	"name": "\u66dd\u5149\u76d1\u6d4b",
// 	"type": 9,
// 	"style": 4,
// 	"length": 0
// }, {
// 	"name": "\u70b9\u51fb\u76d1\u6d4b",
// 	"type": 10,
// 	"style": 4,
// 	"length": 0
// }]
// let mareriel = [{
//     "pic": "http:\/\/mea.meitudata.com\/b69eebac3c99642c719825ee535fd2e5-4637.jpg",
//     "type": 1,
//     "sign": ""
// }, {
//     "pic": "http:\/\/mea.meitudata.com\/0a217efbb39fce1204e1f57056da268a-1072.jpg",
//     "type": 2,
//     "sign": ""
// }, {
//     "video": "http:\/\/mea.meitudata.com\/339be683d5c455c5f948daeee3868dee-7501.mp4?avthumb\/mp4\/vb\/2048k",
//     "type": 3,
//     "sign": ""
// }, {
//     "title": "创意标题",
//     "type": 4,
//     "sign": ""
// }, {
//     "content": "创意描述",
//     "type": 5,
//     "sign": ""
// }, {
//     "pic": "http:\/\/mea.meitudata.com\/0a217efbb39fce1204e1f57056da268a-1072.jpg",
//     "type": 6,
//     "sign": ""
// }, {
//     "button": 1,
//     "type": 7,
//     "sign": ""
// }, {
//     "comment": 0,
//     "type": 8,
//     "sign": "comment_check"
// }, {
//     "url": "http:\/\/fe4.customer.bst.meitu.com\/advert\/add?debug=true1",
//     "type": 9,
//     "sign": ""
// }, {
//     "url": "http:\/\/fe4.customer.bst.meitu.com\/advert\/add?debug=true1",
//     "type": 10,
//     "sign": ""
// },{
//     "url": "http://meitu.com",
//     "type": 11,
//     "target": 1,
//     "sign": ""
//  }, {
//     "url": "http:\/\/fe4.customer.bst.meitu.com\/advert\/add",
//     "type": 11,
//     "target": 2,
//     "sign": ""
// },
//  {
//     "url": "http:\/\/fe4.customer.bst.meitu.com\/advert\/add.apk",
//     "type": 11,
//     "target": 3,
//     "package": "安卓包名",
//     "version": "安卓版本号",
//     "sign": ""
// }, {
//     "url": "mtxx://abc",
//     "type": 11,
//     "target": 4,
//     "url_backup_type": 1,
//     "url_backup_ios": "http:\/\/fe4.customer.bst.meitu.com\/advert\/add.html",
//     "url_backup_android": "http:\/\/fe4.customer.bst.meitu.com\/advert\/add.html",
//     "sign": ""
// }, {
//     "direct_jump": 1,
//     "type": 12,
//     "sign": "direct_jump"
// },{
//     "type": 14,
//     "sign": "",
//     "children": [{
//         "pic": "http:\/\/mea.meitudata.com\/b69eebac3c99642c719825ee535fd2e5-4637.jpg",
//         "sign": "1",
//         "type": 1,
//     },{
//         "pic": "http:\/\/mea.meitudata.com\/b69eebac3c99642c719825ee535fd2e5-4637.jpg",
//         "type": 1,
//         "sign": "2"
//     }]
// }];

// 实现一个订阅者 Dep ，它的主要作用是用来存放   观察者对象

class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    notify () {
        this.subs.forEach((sub) => {
            console.log('video 重载了')
            sub.update();
        })
    }
}

class Watcher {
    constructor () {
        Dep.target = this;
    }

    update () {
        console.log("视图更新啦～");
    }
}

function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function defineReactive (obj, key, val) {
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            console.log(key)
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    });
}

class Preview {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log('render~', this._data['44444']);
    }
}

let o = new Preview({ 
    data: {
        '111112': {
            "pic": "http:\/\/mea.meitudata.com\/b69eebac3c99642c719825ee535fd2e5-4637.jpg",
            "type": 1,
            "sign": "111112"
        }, 
        '222222': {
            "pic": "http:\/\/mea.meitudata.com\/0a217efbb39fce1204e1f57056da268a-1072.jpg",
            "type": 2,
            "sign": "222222"
        }, 
        '33333': {
            "video": "http:\/\/mea.meitudata.com\/339be683d5c455c5f948daeee3868dee-7501.mp4?avthumb\/mp4\/vb\/2048k",
            "type": 3,
            "sign": "33333"
        }, 
        '44444': {
            "title": "创意标题",
            "type": 4,
            "sign": "44444"
        },
        'test': 'hello,test'
    }
});
o._data['test'] = "hello,test";
o._data['44444']['title'] = 'hahahhahah'
Dep.target = null;
