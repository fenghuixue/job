
class Preview {
    constructor(options) {
        this._data = options.data;
        this.observer(this._data);
        // console.log('render~', this._data['44444']);
    }
    observer(data) {
        const that = this;
        this.subscribe = [];
        let handler = {
            get(target, property) {
                that.subscribe.push(target);
                return target[property];
            },
            set(target, key, value) {
                let res = Reflect.set(target, key, value);
                that.subscribe.map(item => {
                    console.log('update~')
                    item.update();
                });
                return res;
            }
        }
        this.$data = new Proxy(data, handler);
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
o.$data['test'] = "hello,test1";
// o.$data['44444']['title'] = 'hahahhahah'
