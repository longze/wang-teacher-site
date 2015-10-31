// 注册
$('.register').click(function () {
    var html = ''
        + '<div class="register-dialog">'
        + '    <div>'
        + '        <label>Email：</label><input type="text"/>'
        + '    </div>'
        + '    <div>'
        + '        <label>User Name：</label><input type="text"/>'
        + '    </div>'
        + '    <div>'
        + '        <label>Password：</label><input type="password"/>'
        + '    </div>'
        + '    <div>'
        + '        <label>Confirm Password：</label><input type="password"/>'
        + '    </div>'
        + '</div>';

    $(html).dialog({
        // title: '注册',
        open: function () {
            $('.ui-dialog-titlebar-close').html('X');
        },
        width: 360,
        buttons: [
            {
                text: 'Register',
                click: function () {
                    var $dialog = $(this);
                }
            },
            {
                text: 'Cancel',
                click: function () {
                    $(this).dialog('destroy');
                }
            }
        ]
    });
});

// 登录
$('.login').click(function () {
    var html = ''
        + '<div class="register-dialog">'
        + '    <div>'
        + '        <label>Email：</label><input type="text"/>'
        + '    </div>'
        + '    <div>'
        + '        <label>Password：</label><input type="password"/>'
        + '    </div>'
        + '</div>';

    $(html).dialog({
        // title: '注册',
        open: function () {
            $('.ui-dialog-titlebar-close').html('X');
        },
        width: 360,
        buttons: [
            {
                text: 'Login',
                click: function () {
                    var $dialog = $(this);
                }
            },
            {
                text: 'Cancel',
                click: function () {
                    $(this).dialog('destroy');
                }
            }
        ]
    });
});
