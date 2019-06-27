// init函数做了什么
Vue.prototype._init = function() {
    let vm = this.vm;
    initLifeCycle(vm);
    initEvents(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    callHook(vm, 'created');
    initRender(vm)
}

// mpVue在init做了什么

Vue$3.prototype._init = function() {
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    
}

Vue$3.prototype.$mount = function (el, hydrating) {
    var this$1 = this;

    // el = el && inBrowser ? query(el) : undefined
    // return mountComponent(this, el, hydrating)

    // 初始化小程序生命周期相关
    var options = this.$options;

    if (options && (options.render || options.mpType)) {
        var mpType = options.mpType; if ( mpType === void 0 ) mpType = 'page';
        return this._initMP(mpType, function () {
          return mountComponent(this$1, undefined, undefined)
        })
    } else {
        return mountComponent(this, undefined, undefined)
    }
};


function initMP (mpType, next) {
    // $mp
    var rootVueVM = this.$root;
    var mp = rootVueVM.$mp;
  
    
    if (mp.status) {
      // 处理子组件的小程序生命周期
      if (mpType === 'app') {
        callHook$1(this, 'onLaunch', mp.appOptions);
      } else {
        callHook$1(this, 'onLoad', mp.query);
        callHook$1(this, 'onReady');
      }
      return next()
    }
    // mp.registered = true
  
    mp.mpType = mpType;
    mp.status = 'register';
  
    if (mpType === 'app') {
      global.App({
        // 页面的初始数据
        globalData: {
          appOptions: {}
        },
  
        handleProxy: function handleProxy (e) {
          return rootVueVM.$handleProxyWithVue(e)
        },
  
        // Do something initial when launch.
        onLaunch: function onLaunch (options) {
          if ( options === void 0 ) options = {};
  
          mp.app = this;
          mp.status = 'launch';
          this.globalData.appOptions = mp.appOptions = options;
          callHook$1(rootVueVM, 'onLaunch', options);
          next();
        },
  
        // Do something when app show.
        onShow: function onShow (options) {
          if ( options === void 0 ) options = {};
  
          mp.status = 'show';
          this.globalData.appOptions = mp.appOptions = options;
          callHook$1(rootVueVM, 'onShow', options);
        },
  
        // Do something when app hide.
        onHide: function onHide () {
          mp.status = 'hide';
          callHook$1(rootVueVM, 'onHide');
        },
  
        onError: function onError (err) {
          callHook$1(rootVueVM, 'onError', err);
        },
  
        onPageNotFound: function onPageNotFound (err) {
          callHook$1(rootVueVM, 'onPageNotFound', err);
        }
      });
    } else if (mpType === 'component') {
      initMpProps(rootVueVM);
  
      global.Component({
        // 小程序原生的组件属性
        properties: normalizeProperties(rootVueVM),
        // 页面的初始数据
        data: {
          $root: {}
        },
        methods: {
          handleProxy: function handleProxy (e) {
            return rootVueVM.$handleProxyWithVue(e)
          }
        },
        // mp lifecycle for vue
        // 组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
        created: function created () {
          mp.status = 'created';
          mp.page = this;
        },
        // 组件生命周期函数，在组件实例进入页面节点树时执行
        attached: function attached () {
          mp.status = 'attached';
          callHook$1(rootVueVM, 'attached');
        },
        // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
        ready: function ready () {
          mp.status = 'ready';
  
          callHook$1(rootVueVM, 'ready');
          next();
  
          // 只有页面需要 setData
          rootVueVM.$nextTick(function () {
            rootVueVM._initDataToMP();
          });
        },
        // 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
        moved: function moved () {
          callHook$1(rootVueVM, 'moved');
        },
        // 组件生命周期函数，在组件实例被从页面节点树移除时执行
        detached: function detached () {
          mp.status = 'detached';
          callHook$1(rootVueVM, 'detached');
        }
      });
    } else {
      var app = global.getApp();
      global.Page({
        // 页面的初始数据
        data: {
          $root: {}
        },
  
        handleProxy: function handleProxy (e) {
          return rootVueVM.$handleProxyWithVue(e)
        },
  
        // mp lifecycle for vue
        // 生命周期函数--监听页面加载
        onLoad: function onLoad (query) {
          mp.page = this;
          mp.query = query;
          mp.status = 'load';
          getGlobalData(app, rootVueVM);
          callHook$1(rootVueVM, 'onLoad', query);
        },
  
        // 生命周期函数--监听页面显示
        onShow: function onShow () {
          mp.page = this;
          mp.status = 'show';
          callHook$1(rootVueVM, 'onShow');
  
          // 只有页面需要 setData
          rootVueVM.$nextTick(function () {
            rootVueVM._initDataToMP();
          });
        },
  
        // 生命周期函数--监听页面初次渲染完成
        onReady: function onReady () {
          mp.status = 'ready';
  
          callHook$1(rootVueVM, 'onReady');
          next();
        },
  
        // 生命周期函数--监听页面隐藏
        onHide: function onHide () {
          mp.status = 'hide';
          callHook$1(rootVueVM, 'onHide');
          mp.page = null;
        },
  
        // 生命周期函数--监听页面卸载
        onUnload: function onUnload () {
          mp.status = 'unload';
          callHook$1(rootVueVM, 'onUnload');
          mp.page = null;
        },
  
        // 页面相关事件处理函数--监听用户下拉动作
        onPullDownRefresh: function onPullDownRefresh () {
          callHook$1(rootVueVM, 'onPullDownRefresh');
        },
  
        // 页面上拉触底事件的处理函数
        onReachBottom: function onReachBottom () {
          callHook$1(rootVueVM, 'onReachBottom');
        },
  
        // 用户点击右上角分享
        onShareAppMessage: rootVueVM.$options.onShareAppMessage
          ? function (options) { return callHook$1(rootVueVM, 'onShareAppMessage', options); } : null,
  
        // Do something when page scroll
        onPageScroll: function onPageScroll (options) {
          callHook$1(rootVueVM, 'onPageScroll', options);
        },
  
        // 当前是 tab 页时，点击 tab 时触发
        onTabItemTap: function onTabItemTap (options) {
          callHook$1(rootVueVM, 'onTabItemTap', options);
        }
      });
    }
  }
  