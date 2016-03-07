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
            close: function () {
                $(this).dialog('destroy');
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
                        if (!(/^[\w_\.]+@\w+\.[a-z]+/.test(email))) {
                            checkResult = false;
                            $('#email', $dialog).parent().find('.check-notice').removeClass('hide').html('* format error');
                        }
                        else {
                            $('#email', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (userName.length < 4) {
                            checkResult = false;
                            $('#userName', $dialog).parent().find('.check-notice').removeClass('hide').html('* least four letters');
                        }
                        else {
                            $('#userName', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (password.length < 6) {
                            checkResult = false;
                            $('#password', $dialog).parent().find('.check-notice').removeClass('hide').html('* least six letters');
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
                            url: '/Home/Passport/register',
                            type: 'POST',
                            data: {
                                'email': email,
                                'userName': userName,
                                'password': password
                            },
                            success: function (data) {
                                // 用户名已被注册
                                if (data.code !== 0) {
                                    if (data.msg === '该电子邮件已被使用！') {
                                        $('#email', $dialog).parent().find('.check-notice').removeClass('hide').html('has been used');
                                    }
                                    if (data.msg === '该用户名已被使用！') {
                                        $('#userName', $dialog).parent().find('.check-notice').removeClass('hide').html('has been used');
                                    }
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

function forgetPassword (userName, $this, $loginDialog) {
    $.ajax({
        url: '/Home/Passport/forgetPassword',
        type: 'POST',
        data: {
            'userName': userName
        },
        success: function (data) {
            $loginDialog.dialog('destroy');
            $this.html('Has send email.');
            // 新开弹框提示结果
            var html = '<div>' + data.msg + '</div>';
            $(html).dialog({
                title: 'Forget Password',
                modal: true,
                width: 450,
                buttons: [
                    {
                        text: 'Sure',
                        click: function () {
                            $(this).dialog('destroy');
                        }
                    }
                ]});
        }
    });
}

// 绑定登录按钮事件
function bindLogin() {
    $('.login').click(function () {
        var html = ''
            + '<div class="register-dialog">'
            + '    <div>'
            + '        <label>User name：</label>'
            + '        <input id="userName" type="text"/>'
            + '        <span class="check-notice hide"></span>'
            + '    </div>'
            + '    <div>'
            + '        <label>Password：</label>'
            + '        <input id="password" type="password"/>'
            + '        <span class="check-notice hide"></span>'
            + '    </div>'
            + '    <div>'
            + '        <label></label>'
            + '        <a class="forget-password">Forget password</a>'
            + '    </div>'
            + '</div>';

        $(html).dialog({
            title: 'Login',
            open: function () {
                $('.ui-dialog-titlebar-close').html('X');
                var $loginDialog = $(this);
                // 忘记密码
                $('.forget-password').click(function () {
                    var $this = $(this);
                    var userName = $('#userName').val();
                    // 验证
                    if (userName === '') {
                        $('#userName').parent().find('.check-notice').removeClass('hide').html('* no empty');
                    }
                    else {
                        $('#userName').parent().find('.check-notice').addClass('hide');
                        forgetPassword(userName, $this, $loginDialog);
                        $this.unbind('click');
                        $this.html('Sending email...');
                    }
                });
            },
            close: function () {
                $(this).dialog('destroy');
            },
            modal: true,
            width: 450,
            buttons: [
                {
                    text: 'Login',
                    click: function () {
                        var $dialog = $(this);
                        var userName = $('#userName', $dialog).val();
                        var password = $('#password', $dialog).val();

                        // 验证
                        var checkResult = true;
                        // 验证
                        if (userName === '') {
                            checkResult = false;
                            $('#userName', $dialog).parent().find('.check-notice').removeClass('hide').html('* no empty');
                        }
                        else {
                            $('#userName', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (password === '') {
                            checkResult = false;
                            $('#password', $dialog).parent().find('.check-notice').removeClass('hide').html('* no empty');
                        }
                        else {
                            $('#password', $dialog).parent().find('.check-notice').addClass('hide')
                        }

                        if (checkResult === false) {
                            return;
                        }

                        $.ajax({
                            url: '/Home/Passport/login',
                            type: 'POST',
                            data: {
                                'userName': userName,
                                'password': password
                            },
                            success: function (data) {

                                if (data.code === 1) {
                                    $('#password', $dialog).parent().find('.check-notice').removeClass('hide').html('* check fail');
                                    return;
                                }
                                $dialog.dialog('destroy');
                                data = data.data;
                                // 写cookie
                                $.cookie('userName', data.userName);
                                $.cookie('email', data.email);
                                $.cookie('sign', data.sign);
                                $.cookie('uid', data.uid);
                                location.reload();
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
    var html = ''
        + '<a class="user-name" href="user.html">' + userName + '</a>'
        + '<span id="signOut">Out</span>';
    userLinkContainer.html(html);

    // 绑定退出
    $('#signOut').click(function () {
        $.cookie('sign', '', {expires: -1});
        $.cookie('email', '', {expires: -1});
        $.cookie('userName', '', {expires: -1});
        window.location.href = '/index.html';
    });
}

//
var windowHeight = $(window).height();
var $body = $('body');
var bodyHeight = $body.height();
if (bodyHeight < windowHeight) {
    $body.css('min-height', (windowHeight - 52) + 'px');
}