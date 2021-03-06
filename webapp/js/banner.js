// banner
(function () {
    // banner的设置，也可转化为动态数据
    var config = [
        {
            text: '绘画',
            backgroundColor: '#eaeeef',
            imgUrl: 'upload/big-picture-draw.png'
        },
        {
            text: '书法',
            backgroundColor: '#a9813d',
            imgUrl: 'upload/big-picture-calligraphy.jpg'
        },
        {
            text: '茶',
            backgroundColor: '#bd9497',
            imgUrl: 'upload/big-picture-tea.jpg'
        },
        {
            text: '火锅',
            backgroundColor: '#A2946C',
            imgUrl: 'upload/big-picture-hotpot.jpg'
        },
        {
            text: '京剧',
            backgroundColor: '#EBE3D9',
            imgUrl: 'upload/big-picture-peking-opera.jpg'
        },
        {
            text: '中国',
            backgroundColor: '#20180D',
            imgUrl: 'upload/big-picture-china.jpg'
        }
    ];
    var bannerContainer = $('#banner-container');
    var menuContainer = bannerContainer.find('.menu-container');
    var imgContainer = bannerContainer.find('.img-container');
    menuContainer.empty();

    var timerId;
    var activeClass = 'active';
    for (var i = 0; i < config.length; i++) {
        var menuItemHtml = $('<span class="item" data-index="' + i + '"></span>');
        menuItemHtml.click(function () {
            window.clearTimeout(timerId);
            var $this = $(this);
            var index = $this.attr('data-index') / 1;

            menuContainer.find('.item').removeClass(activeClass);
            $this.addClass(activeClass);
            var activeImgItemDom = imgContainer.find('.' + activeClass);
            // 平滑过渡处理
            activeImgItemDom.animate({
                    // 先消失
                    opacity: '0'
                },
                500,
                function () {
                    activeImgItemDom.removeClass(activeClass);
                    //bannerContainer.css({
                    //    'background-color': config[index].backgroundColor
                    //});
                    //imgContainer.css({
                    //    'background-image': 'url(' + config[index].imgUrl + ')'
                    //});
                    config[index].imgItemDom.animate({
                            // 再出现
                            opacity: '1'
                        },
                        500,
                        function () {
                            config[index].imgItemDom.addClass(activeClass);
                        });
                    timerId = window.setTimeout(clickNextItem, timeSpace + 2000);
                    // 2000用来消除用户操作造成的心理延时
                }
            );
        });
        menuContainer.append(menuItemHtml);
        config[i].menuItemDom = menuItemHtml;

        var activeClassStr = '';
        if (i === 0) {
            menuItemHtml.click();
            activeClassStr = ' class="active"';
        }

        // 填充图片
        var imgHtml = $('<img src="' + config[i].imgUrl + '"' + activeClassStr + '>');
        imgContainer.append(imgHtml);
        config[i].imgItemDom = imgHtml;
    }
    var timeSpace = 5000; // 图片切换间隔时间
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
