var bgPage = chrome && chrome.extension && chrome.extension.getBackgroundPage();
alert(JSON.stringify(bgPage.getCookie()));