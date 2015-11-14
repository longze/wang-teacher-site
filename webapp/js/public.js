// 绑定注册按钮事件
function bindRegister() {
    $('.register').click(function () {
        var html = ''
            + '<div class="register-dialog">'
            + '    <div>'
            + '        <label>Email：</label><input id="email" type="text"/><span class="check-notice">1223</span>'
            + '    </div>'
            + '    <div>'
            + '        <label>User Name：</label><input id="userName" type="text"/>'
            + '    </div>'
            + '    <div>'
            + '        <label>Password：</label><input id="password" type="password"/>'
            + '    </div>'
            + '    <div>'
            + '        <label>Confirm Password：</label><input id="confirmPassword" type="password"/>'
            + '    </div>'
            + '</div>';
        var $dialog = $(html);
        $dialog.dialog({
            title: 'Register',
            open: function () {
                $('.ui-dialog-titlebar-close').html('X');
            },
            modal: true,
            width: 400,
            buttons: [
                {
                    text: 'Register',
                    click: function () {
                        var $dialog = $(this);
                        var email = $('#email', $dialog).val();
                        var userName = $('#userName', $dialog).val();
                        var password = $('#password', $dialog).val();
                        var confirmPassword = $('#confirmPassword', $dialog).val();

                        // 验证
                        if (!(/^[\w_\.]+@\w+\.[a-z]+$/.test(email))) {

                        }
                        if (userName !== '') {

                        }

                        $.ajax({
                            url: '/register',
                            type: 'POST',
                            data: {
                                'email': email,
                                'userName': userName,
                                'password': password
                            },
                            success: function () {
                                $dialog.dialog('destroy');
                            }
                        });

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
            + '        <label>Email：</label><input id="email" type="text"/>'
            + '    </div>'
            + '    <div>'
            + '        <label>Password：</label><input id="password" type="password"/>'
            + '    </div>'
            + '</div>';

        $(html).dialog({
            title: 'Login',
            open: function () {
                $('.ui-dialog-titlebar-close').html('X');
            },
            modal: true,
            close: function () {

            },
            width: 360,
            buttons: [
                {
                    text: 'Login',
                    click: function () {
                        var $dialog = $(this);
                        var email = $('#email', $dialog).val();
                        var password = $('#password', $dialog).val();

                        // 验证
                        if (!(/^[\w_\.]+@\w+\.[a-z]+$/.test(email))) {

                        }
                        if (userName !== '') {

                        }

                        $.ajax({
                            url: '/login',
                            type: 'POST',
                            data: {
                                'email': email,
                                'password': password
                            },
                            success: function (data) {
                                $dialog.dialog('destroy');
                                data = data.data;

                                // 写cookie
                                $.cookie('userName', data.userName);
                                $.cookie('email', data.email);
                                $.cookie('sign', data.sign);
                                $.cookie('uid', data.uid);

                                userLinkContainer.html('<a class="user-name" href="user.html">' + data.userName + '</a>');
                            }
                        });
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
//$.cookie('userName', 'jack');
// 模拟退出
//$.cookie('userName', '', {expires: -1});

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