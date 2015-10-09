// 注册
$('.register').click(function () {
    var html = ''
        + '<div class="register-dialog">'
        + '    <div>'
        + '        <label>邮箱：</label><input type="text"/>'
        + '    </div>'
        + '    <div>'
        + '        <label>密码：</label><input type="password"/>'
        + '    </div>'
        + '    <div>'
        + '        <label>确认密码：</label><input type="password"/>'
        + '    </div>'
        + '</div>';

    $(html).dialog({
        // title: '注册',
        open: function () {
            $('.ui-dialog-titlebar-close').html('X');
        },
        buttons: [
            {
                text: '注册',
                click: function () {
                    var $dialog = $(this);
                    me.selCataData.delSelcata($dialog, function () {
                        me.selcataTree($dialog);
                    });
                }
            },
            {
                text: '取消',
                click: function () {
                    $(this).dialog('close');
                }
            }
        ]
    });
});

// 登录
$('.login').click(function () {

});

