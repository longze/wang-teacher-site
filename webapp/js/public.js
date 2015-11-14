// 绑定注册按钮事件
function bindRegister() {
    $('.register').click(function () {
        var html = ''
            + '<div class="register-dialog">'
            + '    <div>'
            + '        <label>Email：</label><input id="email" type="text"/><span class="check-notice hide"></span>'
            + '    </div>'
            + '    <div>'
            + '        <label>User Name：</label><input id="userName" type="text"/><span class="check-notice hide"></span>'
            + '    </div>'
            + '    <div>'
            + '        <label>Password：</label><input id="password" type="password"/><span class="check-notice hide"></span>'
            + '    </div>'
            + '    <div>'
            + '        <label>Confirm Password：</label><input id="confirmPassword" type="password"/><span class="check-notice hide"></span>'
            + '    </div>'
            + '</div>';
        var $dialog = $(html);
        $dialog.dialog({
            title: 'Register',
            open: function () {
                $('.ui-dialog-titlebar-close').html('X');
            },
            modal: true,
            width: 450,
            buttons: [
                {
                    text: 'Register',
                    click: function () {
                        var $dialog = $(this);
                        var email = $('#email', $dialog).val();
                        var userName = $('#userName', $dialog).val();
                        var password = $('#password', $dialog).val();
                        var confirmPassword = $('#confirmPassword', $dialog).val();

                        var checkResult = true;
                        // 验证
                        if (!(/^[\w_\.]+@\w+\.[a-z]+$/.test(email))) {
                            checkResult = false;
                            $('#email', $dialog).parent().find('.check-notice').removeClass('hide').html('* format error');
                        }
                        else {
                            $('#email', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (userName === '') {
                            checkResult = false;
                            $('#userName', $dialog).parent().find('.check-notice').removeClass('hide').html('* none empty');
                        }
                        else {
                            $('#userName', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (password === '') {
                            checkResult = false;
                            $('#password', $dialog).parent().find('.check-notice').removeClass('hide').html('* none empty');
                        }
                        else {
                            $('#password', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (password !== confirmPassword) {
                            checkResult = false;
                            $('#confirmPassword', $dialog).parent().find('.check-notice').removeClass('hide').html('* confirm error');
                        }
                        else {
                            $('#confirmPassword', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (checkResult === false) {
                            return;
                        }

                        $.ajax({
                            url: '/register',
                            type: 'POST',
                            data: {
                                'email': email,
                                'userName': userName,
                                'password': password
                            },
                            success: function (data) {
                                // 用户名已被注册
                                if (data.code === 0) {
                                    $('#userName', $dialog).parent().find('.check-notice').removeClass('hide').html('* has been used');
                                }
                                else if (data.code === 2) {
                                    $('#email', $dialog).parent().find('.check-notice').removeClass('hide').html('* has been used');
                                }
                                else {
                                    $dialog.dialog('destroy');
                                    $('.login').click();
                                }
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