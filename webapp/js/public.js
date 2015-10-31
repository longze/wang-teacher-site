// 绑定注册按钮事件
function bindRegister() {
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
}

// 绑定登录按钮事件
function bindLogin() {
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
}

// 模拟登陆
$.cookie('userName', 'jack');
// 模拟退出
//$.cookie('userName', '', { expires: -1 });

var userLinkContainer = $('.user-link-container');
var userName = $.cookie('userName');
// 未登录
if (!userName) {
    bindRegister();
    bindLogin();
}
// 已登录
else {

    userLinkContainer.html('<a class="user-name" href="user.html">' + userName + '</a>');
}