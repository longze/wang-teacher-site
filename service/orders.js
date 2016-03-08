/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200, response500) {

        return {
            code: 0,   // 0 成功，1 失败
            message: '',
            data: [ // 业务数据
                //[{
                //    id: '1',
                //    coverImgUrl: '/upload/chinese-name.jpg',
                //    description: '描述信息',
                //    title: '起中文名', // 必填字段
                //    price: 1
                //},
                //{
                //    id: '2',
                //    coverImgUrl: '/upload/cup.jpg',
                //    description: '描述信息',
                //    title: '青花瓷图章印名杯', // 必填字段
                //    price: 2
                //},
                //{
                //    id: '3',
                //    coverImgUrl: '/upload/face.jpg',
                //    description: '描述信息',
                //    title: '京剧脸谱', // 必填字段
                //    price: 3
                //}]
            ]
        };
    }
};