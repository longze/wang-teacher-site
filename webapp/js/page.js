// 注册
$('.register').click(function () {
    var html = ''
        + '<div class="register-dialog">'
        + '    <div>'
        + '        <label>Email：</label><input type="text"/>'
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

// banner
(function () {
    // banner的设置，也可转化为动态数据
    var config = [
        {
            backgroundColor: '#eaeeef',
            imgUrl: 'upload/big-picture-1.png'
        },
        {
            backgroundColor: '#333',
            imgUrl: 'upload/big-picture-1.png'
        },
        {
            backgroundColor: '#fff',
            imgUrl: 'upload/big-picture-1.png'
        }
    ];
    var bannerContainer = $('#banner-container');
    var menuContainer = bannerContainer.find('.menu-container');
    menuContainer.empty();

    var timerId;
    var activeClass = 'active';
    for (var i = 0; i < config.length; i++) {
        var menuItemHtml = $('<span class="item" data-index="' + i + '"></span>');
        menuItemHtml.click(function () {
            var $this = $(this);
            var index = $this.attr('data-index') / 1;

            menuContainer.find('.item').removeClass(activeClass);
            $this.addClass(activeClass);
            // 平滑过渡处理
            bannerContainer.animate({
                    opacity: '0'
                },
                500,
                function () {
                    bannerContainer.css({
                        'background-color': config[index].backgroundColor
                    });
                    $this.css({
                        'background-color': 'url(' + config[index].imgUrl + ')'
                    });
                    bannerContainer.animate({
                        opacity: '1'
                    }, 500);
                }
            );
        });
        menuContainer.append(menuItemHtml);
        config[i].menuItemDom = menuItemHtml;

        if (i === 0) {
            menuItemHtml.click();
        }
    }
    var timeSpace = 3000; // 图片切换间隔时间
    timerId = window.setTimeout(clickNextItem, timeSpace);

    function clickNextItem() {
        var index = menuContainer.find('.' + activeClass).attr('data-index') / 1 + 1;
        if (index === config.length) {
            index = 0;
        }
        config[index].menuItemDom.click();
        // 下一次
        timerId = window.setTimeout(clickNextItem, timeSpace);
    }
})();