// 内容脚本：运行在用户网页上下文中的脚本
var tips = document.createElement('p')
tips.innerHTML = '<span style="font-size: 24px; color: red;">cookie listener is running on this page</span>'
document.body.prepend(tips)

// 与嵌入的页面通信(通过postMessage)
var port = chrome.runtime.connect()
window.addEventListener('message', function (msg) {
    // if (msg.data) { 
    //     port.postMessage(msg.data)
    // }
})

// 与扩展程序其他通信
chrome && chrome.runtime && chrome.runtime.sendMessage({
    type: 'pathInfo',
    host: location.hostname,
    path: location.pathname,
    data: document.cookie
})
