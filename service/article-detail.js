/**
 * Created by zhaoxiaoqiang on 15/6/6.
 */
module.exports = {
    contentType: 'json',
    data: function (request, response, response200, response500) {

        return {
            code: 0,   // 0 成功，1 失败
            message: '',
            data: {
                topic: '文章标题',
                content: '文章内容'
            }
        };
    }
}
;