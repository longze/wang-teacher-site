/**
 * 服务路由配置文件
 *
 * Created by v_zhaoxiaoqiang on 2015/6/3.
 */
module.exports = [
    {
        requestMethodType: 'POST',
        contentType: 'json',
        urlPath: '/Home/Article/index', // 匹配的请求路径（不包括url参数）
        modelPath: '/articles',           // 响应模块路径（其实是与server下config的servicePath做拼接）
        methodName: 'data'                // 模块具体响应方法，默认是data方法
    },
    {
        requestMethodType: 'POST',
        contentType: 'json',
        urlPath: '/Home/Product/list',
        modelPath: '/products',
        methodName: 'data'
    }
];