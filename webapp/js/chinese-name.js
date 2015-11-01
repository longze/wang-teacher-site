// 获取数据，初始化页面
getProducts();

// 获取商品列表
function getProducts() {
    $.ajax({
        url: '/products',
        success: function (data) {
            appendToDom(data.data);
        }
    });
}

function appendToDom(data) {
    var html;
    // 未添加商品
    if (data.length === 0) {
        html = '<div class="data-empty">站长还未添加商品</div>';
        $('.chinese-name-container').append(html);
    }
    else {
        // 默认商品
        html = ''
            + '<img class="product-picture" src="' + data[0].coverImgUrl + '"/>'
            + '    <label class="price">'
            + '    <input type="checkbox" value="' + data[0].id + '" checked disabled/> '
            +      data[0].title + data[0].price + '$'
            + '</label>';
        $('.default-product').html(html);

        // 总价
        $('.total').html('总价：<span>' + data[0].price + '</span>$');
    }

    // 其他商品
    if (data.length > 1) {
        for (var i = 1; i < data.length; i++) {

            html = ''
                + '<div class="item">'
                + '<img class="product-picture" src="' + data[i].coverImgUrl + '"/>'
                + '    <label class="price">'
                + '    <input type="checkbox"/>' + data[i].title + data[i].price + ' $'
                + '</label>'
                + '</div>';
            $('.other-product-container').append(html);
        }
    }
}