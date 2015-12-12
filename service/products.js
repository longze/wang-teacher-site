/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200, response500) {

        return {
            code: 1,   // 1 成功，0 失败
            message: '',
            data: [ // 业务数据
                {
                    id: '1',
                    product_img: '/upload/chinese-name.jpg',
                    product_ad: '描述信息',
                    product_name: '起中文名', // 必填字段
                    product_price: 1
                },
                {
                    id: '2',
                    product_img: '/upload/cup.jpg',
                    product_ad: '描述信息',
                    product_name: '青花瓷图章印名杯', // 必填字段
                    product_price: 2
                },
                {
                    id: '3',
                    product_img: '/upload/face.jpg',
                    product_ad: '描述信息',
                    product_price: '京剧脸谱', // 必填字段
                    product_price: 3
                }
            ]
        };
    }
}
;