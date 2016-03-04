var data;
initArticleData();

function initArticleData() {
    // 初始化数据
    var id = parseInt(location.href.replace(/.+\.html\?id=/, ''));
    data = {
        id: id
    };
    getArticleDetail();
}

// 获取文章数据
function getArticleDetail() {
    $.ajax({
        // url: '/articles',
        url: '/Home/Article/detail',
        type: 'POST',
        data: data,
        dataType: 'JSON',
        success: function (data) {
            appendToDom(data.data);
        }
    });
    data.pageNum++;
}

// 填充文章数据到页面
function appendToDom(data) {
    var reelBody = $('.reel-body');
    data.article = data.article.replace(/&lt;/ig, '<');
    data.article = data.article.replace(/&gt;/ig, '>');
    var html = ''
        + '<h1 class="article-detail-title">' + data.topic + '</h1>'
        + '<div class="article-detail-content">' + data.article + '</div>';
    reelBody.html(html);

}
