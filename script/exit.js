function exitApp(){
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err){
            api.toast({
                    msg: '再按一次返回键退出DATC应用',
                    duration:2000,
                    location: 'bottom'
                });

                api.addEventListener({
                    name: 'keyback'
                }, function(ret, err){
                    api.closeWidget({
                            id: 'A6086410874906',  //填写自己的id
                            retData: {name:'closeWidget'},
                            silent:true
                        });
                });
                setTimeout(function(){
                        exitApp();
                },3000)
        });
}
