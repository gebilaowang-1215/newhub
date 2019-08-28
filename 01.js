var express = require('express');
var app = express();

var db = require('./newdb');
// 使用路由中间件
var router = express.Router();
// 处理post请求
var bodyParser = require('body-parser');
// 处理post中json的请求
app.use(bodyParser.json());
// 处理post中字符串的请求
app.use(bodyParser.urlencoded({ extendeds: false }));
//设置静态文件目录
app.use(express.static('static'));
// 使用路由(放在最后)
app.use(router);
// 注册接口
router.post('/add', (req, res) => {
    // 接受前端传输过来的值  post
    // 
    var regUse = {
        username: req.body.username,
        password: req.body.password,
        createAt: new Date(),
        UpdateAt: new Date(),
        phone: req.body.phone,
        email: req.body.email,
        tokenId: 1
    }
    db.add('test', regUse, (err, data) => {
        if (err) {
            throw err;
        }
        res.send({ 'success': 'ok' });
    })
})
// 登录接口
router.get('/login', (req, res) => {
    // 接受前端传输过来的值  query
    // 根据前端的值与数据库里面的用户数据进行对比  find
    // 判断是否存在该用户
    // 在与数据里面的数据进行对比
    // 一致时返回成功
    // 前端返回登录成功的跳转

    // 接受前端传输的值
    var userData = {
        username: req.query.username,
        password: req.query.password,
    }
    // 进行数据的检索
    // 先把数据库里面的所有数据取出
    db.find('test', userData, (err, result) => {
        if (result.length == 0) {
            res.send({ 'error': '登录失败' })
        } else {
            res.send({ 'success': '登录成功' })
        }
    })
});
app.listen(3000);
/*
跨域处理：
    1.代理   node-http-proxy
    2.jsonp  只支持get方式
    3.设置请求响应头
    4.cros  get/post
*/ 