// 获取数据，初始化页面
getProducts();

// 获取商品列表
function getProducts() {
    $.ajax({
        url: '/Home/Product/list',
        type: 'POST',
        success: function (data) {
            appendToDom(data.data);
            window.products = data.data;
        }
    });
}

// 将商品信息填充到页面
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
            + '    <input type="checkbox" value="' + data[0].id + '" checked disabled data-price="' + data[0].price + '"/> '
            + data[0].title + data[0].price + '$'
            + '</label>';
        $('.default-product').html(html);

        // 总价
        $('.total').html('总价：<span>' + data[0].price + '</span>$<button id="buy-button">马上购买</button>');
        bindBuyButton();
    }

    // 其他商品
    if (data.length > 1) {
        for (var i = 1; i < data.length; i++) {

            html = ''
                + '<div class="item">'
                + '<img class="product-picture" src="' + data[i].coverImgUrl + '"/>'
                + '    <label class="price">'
                + '    <input type="checkbox" value="' + data[i].id + '" data-price="' + data[i].price + '"/>'
                + data[i].title + data[i].price + ' $'
                + '</label>'
                + '</div>';
            $('.other-product-container').append(html);
        }
    }
    updateTotal();
}

// 更新总额
function updateTotal() {
    $('.price').change(function () {
        var total = 0;
        $('[data-price]:checked').each(function () {
            total += $(this).attr('data-price') / 1;
        });
        $('.total span').html(total);
    });
}

// 提交订单
function bindBuyButton() {
    $('#buy-button').click(function () {
        var ids = [];
        $('[data-price]:checked').each(function () {
            var str = $(this).val() + ':1';
            ids.push(str);
        });

        // 未登录
        if ($.cookie('sign') === undefined) {
            $('.login').click();
            return;
        }
        else {
            var uid = $.cookie('uid');
            var sign = $.cookie('sign');
        }

        $.ajax({
            url: '/Home/Product/buy',
            type: 'POST',
            data: {
                uid: uid,
                sign: sign,
                productIds: ids.join(',')
            },
            success: function (data) {
                var html = ''
                    + '<div class="t-c">'
                    + '    订到已提交，'
                    + '    <a href="' + data.data + '" target="blank">点击支付</a>'
                    + '</div>';
                $(html).dialog({
                    modal: true,
                    open: function () {
                        $('.ui-dialog-titlebar-close').html('X');
                    }
                });
            }
        });
    });
}