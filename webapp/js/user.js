// 从cookie提取信息
if ($.cookie('sign')) {
    var email = $.cookie('email');
    $('.email-text').html(email);
    var userName = $.cookie('userName');
    $('.user-name-text').html(userName);

    getOrders();
}

// 获取订单信息
function getOrders() {
    $.ajax({
        url: '/api/Home/Order/list',
        data: {
            uid: $.cookie('uid'),
            sign: $.cookie('sign')
        },
        success: function (data) {
            appendOrdersToDom(data.data)
        }
    });
}

// 填充到页面
function appendOrdersToDom(data) {
    var orderItemContainer = $('.order-item-container');
    for (var i = 0; i < data.length; i++) {
        var orderItemData = data[i];
        var html = '<div class="order clear-float">';
        for (var j = 0; j < orderItemData.length; j++) {
            html += ''
                + '<div class="item">'
                + '    <img class="product-picture" src="' + orderItemData[j].product_img + '"/>'
                + '    <label class="price">'
                + '    ' + orderItemData[j].product_name + orderItemData[j].product_price + '$'
                + '    </label>'
                + '</div>';
        }
        html += '</div>';
        orderItemContainer.append(html);
    }
    if (data.length === 0) {
        orderItemContainer.append('<div class="data-empty"> 暂无订单 < / div >');
    }
}
