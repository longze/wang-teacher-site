// 从cookie提取信息
if ($.cookie('sign')) {
    var email = $.cookie('email');
    $('.email-text').html(email);
    var userName = $.cookie('userName');
    $('.user-name-text').html(userName);

    getOrders();
}
// 退出
$('#signOut').click(function () {
    $.cookie('sign', '', { expires: -1 });
    $.cookie('email', '', { expires: -1 });
    $.cookie('userName', '', { expires: -1 });
    window.location.href = '/index.html';
});
// 获取订单信息
function getOrders() {
    $.ajax({
        url: '/Home/Order/list',
        data: {
            uid: $.cookie('uid'),
            sign: $.cookie('sign')
        },
        success: function (data) {
            appendOrdersToDom(data.data)
        },
        error: function () {
            var html = ''
                + '<div style="text-align: center;line-height: 47px;padding-bottom: 0;">'
                + '    order load fail.'
                + '</div>';

            $(html).dialog({
                title: 'Error',
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
                        text: 'Cancel',
                        click: function () {
                            $(this).dialog('destroy');
                        }
                    }
                ]
            });
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

