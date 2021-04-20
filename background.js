// 插件执行时提示
new Notification('cookie监听插件提示', {
    dir: 'ltr',
    lang: 'utf-8',
    icon: '',
    body: '扩展执行中'
})

var _cookie = {},
    _currentPath,
    _fileEntry;

// 接收内容脚本传递的消息
chrome && chrome.runtime && chrome.runtime.onMessage.addListener(function(msg){
    // {type: '', host: '', path: '', data: ''}
    /* if (msg && msg.host && !_cookie[msg.host]) {
        _cookie[msg.host] = {}
    }
    if (msg && msg.path && !_cookie[msg.host][msg.path]) {
        _cookie[msg.host][msg.path] = {}
    } */
})

chrome && chrome.tabs && chrome.tabs.onUpdated && chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(`标签页发生变更，当前url为: ${changeInfo.url}`)
    // _currentPath = tab.url;
    // if (!_cookie[_currentPath] && _currentPath.indexOf('yunzhijia.com') !== -1) {
    //     _cookie[_currentPath] = {}
    // }
})

chrome && chrome.cookies && chrome.cookies.onChanged && chrome.cookies.onChanged.addListener(function(obj) {
    var domain, name, value;
    var operateType = {
        explicit: '添加或删除',
        expired_overwrite: '过期被清理',
        evicted: '垃圾收集自动清理',
        overwrite: '覆盖'
    }
    console.log(`cookie ${obj.cookie.name} 发生变更, 变更类型为: ${operateType[obj.cause]}`)
    if (obj && obj.cookie) {
        domain = obj.cookie.domain;
        name = obj.cookie.name;
        value = obj.cookie.value;
        if ((domain.indexOf('yunzhijia.com') > -1) && !(_cookie.hasOwnProperty(name))) {
            _cookie[name] = obj.cookie
            localStorage.setItem('chrome_extension_cookie', JSON.stringify(_cookie))
        }
    }
})

