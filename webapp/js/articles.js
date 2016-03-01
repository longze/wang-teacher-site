var data;
initArticleData();

function initArticleData() {
    // 初始化数据
    var groupId = parseInt(location.href.replace(/.+\.html#/, ''));
    data = {
        pageNum: 1
    };
    if (!isNaN(groupId)) {
        data.groupId = groupId;
    }
    $('.item-line').empty();
    // 填充第一批数据
    getArticles();
}

// 监听滚动条
$(window).scroll(scrollCallback);
function scrollCallback() {
    var bodyHeight = $('body').height();
    var scrollTop = $(window).scrollTop();

    if (bodyHeight - scrollTop - $(this).height() < 50) {
        getArticles();

        // 需要延迟触发，否则一次加载多页
        $(window).unbind('scroll');
        setTimeout(function () {
            $(window).scroll(scrollCallback);
        }, 2000);
    }
}

// 获取文章数据
function getArticles() {
    $.ajax({
        // url: '/articles',
        url: '/Home/Article/index',
        type: 'POST',
        data: data,
        dataType: 'JSON',
        success: function (data) {
            appendToDom(data.data);
            // 当数据为空时解绑滚动条事件
            if (data.data === undefined || data.data.length === 0) {
                $(window).unbind('scroll');
            }
        }
    });
    data.pageNum++;
}

// 填充文章数据到页面
function appendToDom(data) {
    var itemLines = $('.item-line');

    for (var i = 0; i < data.length; i++) {
        (function (data) {
            var img = data.coverImgUrl ? '    <img class="cover" src="' + data.coverImgUrl + '"/>' : '';
            var href = ' href="/article-detail.html#' + data.id + '"';
            var html = ''
                + '<a class="item"' + href + '>'
                + img
                + '    <h2 class="title">' + data.title + '</h2>'
                + '    <div class="description">'
                + (data.description ? data.description : '')
                + '    </div>'
                + '</a>';
            setTimeout(function () {
                getShortestItem(itemLines).append(html);
            }, 300);
        })(data[i]);
    }
}

function getShortestItem(itemLines) {
    var height = 0;
    var index = 0;

    for (var i = 0; i < itemLines.length; i++) {
        if (i === 0) {
            height = itemLines.eq(i).height();
        }

        if (itemLines.eq(i).height() < height) {
            index = i;
            height = itemLines.eq(i).height();
        }
    }

    return itemLines.eq(index);
}

// 分类切换事件绑定
$('[hook-articles] a').click(function () {
    window.setTimeout(function () {
        initArticleData();
    });
});