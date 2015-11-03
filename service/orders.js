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
                [{
                    id: '1',
                    coverImgUrl: '/css/img/create-name.png',
                    description: '描述信息',
                    title: '起中文名', // 必填字段
                    price: 1
                },
                {
                    id: '2',
                    coverImgUrl: '/css/img/create-name.png',
                    description: '描述信息',
                    title: '骨质瓷印名水杯', // 必填字段
                    price: 2
                },
                {
                    id: '3',
                    coverImgUrl: '/css/img/create-name.png',
                    description: '描述信息',
                    title: '印名T恤', // 必填字段
                    price: 3
                }]
            ]
        };
    }
};