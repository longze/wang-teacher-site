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
        $('.total').hide();
    }
    else {
        // 默认商品
        var attr = ''
            + ' checked disabled'
            + ' data-price="' + data[0].product_price + '"'
            + ' value="' + data[0].product_price + '"';
        html = ''
            + '    <input type="checkbox"'+ attr + '/> $'
            + data[0].product_price;
        $('.name-price').append(html);
        $('#chinese-name-picture').attr('src', data[0].product_img);

        // 总价
        $('.total').html('Total:$<span>' + data[0].product_price + '</span><button id="buy-button">Buy Now</button>');
        bindBuyButton();
    }

    // 其他商品
    if (data.length > 1) {
        for (var i = 1; i < data.length; i++) {
            html = ''
                + '<div class="item">'
                + '<img class="product-picture" src="' + data[i].product_img + '"/>'
                + '    <label class="price">'
                + '    <input type="checkbox" value="' + data[i].id + '" data-price="' + data[i].product_price + '"/>'
                + data[i].product_name
                + ' <br/>$'
                + data[i].product_price
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
                productIds: ids.join(','),
                userInfo: getFromData('user-info')
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
            },
            error: function () {
                var html = ''
                    + '<div style="text-align: center;line-height: 47px;padding-bottom: 0;">'
                    + '    submit order fail.'
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
    });
}

var getFromData = (function () {
    function g(id) {
        return document.getElementById(id);
    }
    /**
     * 获取表单数据
     *
     * @param {string|Object} form 要读取的表单，只接受两种格式：form的id，form的原生dom节点
     * @param {Boolean} isFilterEmpty 是否将空值（空字符串，没有选中项的组）从对象中过滤掉
     * @param {string|Object} noCheckedValue checkbox和radio组没有选中项时取得值
     * @return {Object} formObj 获取到的数据对象
     * @public
     */
    function getFromData(form, isFilterEmpty, noCheckedValue) {
        if (typeof form === 'string') {
            form = g(form);
        }
        if (form && form.nodeType !== 1) {
            return '无法找到容器';
        }
        // 设置缺省值，因为传入的值可能是undefined所以通过参数组长度来设置缺省值
        if (arguments.length == 1) {
            noCheckedValue = null;
        }
        var formObj = {};
        var formCheckboxObj = {};
        var emptyArr = [];
        // 准备表单元素列表，根据键值特性分为两类
        var formEleArr = {
            single: emptyArr.concat(
                emptyArr.slice.call(form.getElementsByTagName('select')),
                emptyArr.slice.call(form.getElementsByTagName('textarea'))
            ),
            input: emptyArr.slice.call(form.getElementsByTagName('input'))
        };
        // 单键值元素
        formEleArr.single.forEach(function (ele) {
            single(ele, formObj, isFilterEmpty);
        });
        // input情况比较复杂
        formEleArr.input.forEach(function (ele) {
            var type = ele.type;
            // 单键值处理
            if (type === 'hidden' || type === 'text') {
                single(ele, formObj, isFilterEmpty);
            }
            // 一组一值
            else if (type === 'radio') {
                radio(ele, formObj, noCheckedValue, isFilterEmpty);
            }
            // 一组多值
            else if (type === 'checkbox') {
                checkbox(ele, formCheckboxObj, noCheckedValue);
            }
        });
        // 将一组多值合并会单键值
        for (var name in formCheckboxObj) {
            if (formCheckboxObj[name].length > 0) {
                var checkboxVal = formCheckboxObj[name].join(',');
                if (isFilterEmpty === true) {
                    if (checkboxVal !== '') {
                        ormObj[name] = checkboxVal;
                    }
                }
                else {
                    formObj[name] = checkboxVal;
                }
            }
            else {
                if (isFilterEmpty !== true) {
                    formObj[name] = noCheckedValue;
                }
            }
        }
        return formObj;
    }
    // 单键值处理
    function single(ele, formObj, isFilterEmpty) {
        var name = trim(ele.name);
        var val = trim(ele.value);
        if (name !== '') {
            if (isFilterEmpty === true) {
                if (val !== '') {
                    formObj[name] = ele.value;
                }
            }
            else {
                formObj[name] = val;
            }
        }
    }
    // 一组一值
    function radio(ele, formObj, noCheckedValue, isFilterEmpty) {
        var name = trim(ele.name);
        var val = trim(ele.value);
        if (name !== '') {
            if (ele.checked) {
                if (isFilterEmpty === true) {
                    if (val !== '') {
                        formObj[name] = val;
                    }
                }
                else {
                    formObj[name] = val;
                }
            }
            else if (isFilterEmpty !== true && formObj[name] === undefined) {
                formObj[name] = noCheckedValue;
            }
        }
    }
    // 一组多值
    function checkbox(ele, formCheckboxObj) {
        var name = trim(ele.name);
        var val = trim(ele.value);
        if (name !== '') {
            if (formCheckboxObj[name] === undefined) {
                formCheckboxObj[name] = [];
            }
            if (ele.checked) {
                formCheckboxObj[name].push(val);
            }
        }
    }
    function trim(str) {
        if (typeof str === 'string') {
            return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
        else {
            return str;
        }
    }
    return getFromData;
})();