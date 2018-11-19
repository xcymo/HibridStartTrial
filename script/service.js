var istest = true;
if (istest) {
    // 测试
    window.baseUrl = 'http://inbank.kuaiyunma.com/'
} else {
    window.baseUrl = 'http://inapi.kuaiyunma.com/'
}



document.write("<script src='https://cdn.jsdelivr.net/bluebird/latest/bluebird.js'><\/script>");
window.dataListLength = 25;

function $http(obj) {
    var connectionType = api.connectionType;
    if (connectionType == 'none') {
        api.hideProgress();
        api.openWin({
            name: 'offlineWin',
            url: 'widget://html/common/offlineWin.html',
        });
    }
    console.log(obj.url);
    var headers;
    var lang;
    var langs = localStorage.lang
    if (langs == 'zh') {
        lang = "zh-CN"
    }
    if (langs == 'com') {
        lang = "zh-CN"
    }
    if (langs == 'en') {
        lang = "zh-CN"
    }
    nowTime(headers);
    if (localStorage.access_token) {
        var auth = localStorage.token_type + " " + localStorage.access_token
        headers = {
            "Authorization": auth,
            "lang": lang
        }
        // console.log(JSON.stringify(headers))
    }
    // console.log(JSON.stringify(obj))

    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: headers,
            type: obj.method,
            data: obj.data,
            url: baseUrl + obj.url,
            dataType: "json",
            success: function (data) {
                // console.log(JSON.stringify(data));
                resolve(data)
            },
            error: function (err) {
                console.log(obj.url);
                console.log(JSON.stringify(err));
                api.hideProgress();
                api.refreshHeaderLoadDone();
                if (err.responseJSON && err.responseJSON.code == -1) {
                    if (err.responseJSON.message) {
                        api.toast({
                            msg: err.responseJSON.message,
                            duration: 2000,
                            location: 'bottom'
                        });
                    } else {
                        console.log(JSON.stringify(err))
                        api.toast({
                            msg: '服务器异常,请稍后再试',
                            duration: 2000,
                            location: 'bottom'
                        });
                    }
                    localStorage.clear()
                    setTimeout(function () {
                        api.openWin({
                            name: 'loginWin',
                            url: 'widget://html/login/loginWin.html'
                        });
                    }, 1000)
                    return
                }

                if (err.responseJSON && err.responseJSON.code == 0) {
                    if (err.responseJSON.message) {
                        api.toast({
                            msg: err.responseJSON.message,
                            duration: 2000,
                            location: 'bottom'
                        });
                    } else {
                        console.log(JSON.stringify(err))
                        api.toast({
                            msg: '服务器异常,请稍后再试',
                            duration: 2000,
                            location: 'bottom'
                        });
                    }
                }
            }
        });

    })
}

function $upload(obj) {
    var headers;
    var lang;
    var langs = localStorage.lang
    if (langs == 'zh') {
        lang = "zh-CN"
    }
    if (langs == 'com') {
        lang = "zh-CN"
    }
    if (langs == 'en') {
        lang = "zh-CN"
    }
    if (localStorage.access_token) {
        var auth = localStorage.token_type + " " + localStorage.access_token
        headers = {
            "Authorization": auth,
            "lang": lang
        }
    }
    //  console.log(JSON.stringify(headers))
    console.log(JSON.stringify(obj))
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: baseUrl + obj.url,
            headers: headers,
            type: obj.method,
            contentType: false,
            processData: false,
            data: obj.data,
            success: function (data) {
                resolve(data)
                console.log(JSON.stringify(data));
            },
            error: function (err) {
                api.hideProgress();
                if (err.responseJSON.message) {
                    api.toast({
                        msg: err.responseJSON.message,
                        duration: 2000,
                        location: 'bottom'
                    });
                } else {
                    console.log(JSON.stringify(err))
                    console.log(err.message);
                    api.toast({
                        msg: '服务器异常',
                        duration: 2000,
                        location: 'bottom'
                    });
                }

            }
        })
    })

}

function nowTime(headers) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;

    var ex = localStorage.expires_in;
    // var ex = 750;

    var localStorageTime = localStorage.loginTime;
    if (ex - 300 < timestamp - localStorageTime && timestamp - localStorageTime < ex - 100) {

        return new Promise(function (resolve, reject) {
            $.ajax({
                headers: headers,
                type: 'get',
                url: baseUrl + '/user/refresh',
                dataType: "json",
                success: function (res) {
                    if (res.code == 200) {
                        localStorage.access_token = res.data.access_token
                        localStorage.token_type = res.data.token_type
                        localStorage.expires_in = res.data.expires_in

                        var logtime = Date.parse(new Date());
                        logtime = logtime / 1000;
                        localStorage.loginTime = logtime;
                    }
                },
                error: function (err) {
                    console.log(JSON.stringify(err))
                    api.hideProgress();
                    api.refreshHeaderLoadDone();

                    if (err.responseJSON && err.responseJSON.code == -1) {
                        if (err.responseJSON.message) {
                            api.toast({
                                msg: err.responseJSON.message,
                                duration: 2000,
                                location: 'bottom'
                            });
                        } else {
                            console.log(JSON.stringify(err))
                            api.toast({
                                msg: '服务器异常,请稍后再试',
                                duration: 2000,
                                location: 'bottom'
                            });
                        }
                        localStorage.clear()
                        setTimeout(function () {
                            api.openWin({
                                name: 'loginWin',
                                url: 'widget://html/login/loginWin.html',

                            });
                        }, 1000)
                        return
                    }

                    if (err.responseJSON && err.responseJSON.code == 0) {
                        if (err.responseJSON.message) {
                            api.toast({
                                msg: err.responseJSON.message,
                                duration: 2000,
                                location: 'bottom'
                            });
                        } else {
                            console.log(JSON.stringify(err))
                            api.toast({
                                msg: '服务器异常,请稍后再试',
                                duration: 2000,
                                location: 'bottom'
                            });
                        }
                    }
                }
            });

        })
    }
}
