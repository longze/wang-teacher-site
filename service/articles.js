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
                {
                    id: '1',
                    coverImgUrl: '/upload/article/4.jpg',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题', // 必填字段
                    description: '描述信息'
                },
                {
                    id: '2',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题'
                },
                {
                    id: '3',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题', // 必填字段
                    description: '描述信息'
                },
                {
                    id: '1',
                    coverImgUrl: '/upload/article/1.jpg',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题', // 必填字段
                    description: '描述信息'
                },
                {
                    id: '2',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题'
                },
                {
                    id: '3',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题', // 必填字段
                    description: '描述信息'
                },
                {
                    id: '1',
                    coverImgUrl: '/upload/article/2.jpg',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题', // 必填字段
                    description: '描述信息'
                },
                {
                    id: '2',
                    coverImgUrl: '/upload/article/3.jpg',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题'
                },
                {
                    id: '3',
                    coverImgUrl: '/upload/article/4.jpg',
                    alt: '',  // 图片描述，可为空 // 选填字段
                    title: '文章标题', // 必填字段
                    description: '描述信息'
                }
            ]
        };
    }
}
;