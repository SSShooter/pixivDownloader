var app = require('express')();
var request = require('superagent');
var cheerio = require('cheerio');

app.get('/', function (req, res) {
    res.send('Hello World !');
});

app.get('/getpic/:id', function (req, res) {
    let id = req.params.id;
    let resObj = {
        code: 200,
        data: {},
        itype:''
    };
    request.get(`http://www.pixiv.net/member_illust.php?mode=medium&illust_id=${id}`)
        .end(function (err, _response) {
            if (!err) {
                var $ = cheerio.load(_response.text, {
                    decodeEntities: false
                });
                let dom = $('.medium-image');
                resObj.data.thumbnail_ = dom.children().first().attr('src');
                if(resObj.data.thumbnail_){//有缩略图
                    resObj.itype = 'pic';
                }else{
                    resObj.itype = 'gif';
                }
                resObj.data.src = $('.selected_works').children().children().attr('src');
                
            } else {
                resObj.code = 404;
                console.log('Get data error!');
            }

            res.send(resObj);
        });
});
app.get('/searchpic/:keyword/:star', function (req, res) {
    var keyword = encodeURI(req.params.keyword);
    var star = req.params.star || 0;
    console.log(keyword);
    var resObj = {
        code: 200,
        data: {}
    };
    request.get(`http://www.pixiv.net/search.php?s_mode=s_tag&word=${keyword}%20${star}`)
        .end(function (err, _response) {
            if (!err) {
                var $ = cheerio.load(_response.text, {
                    decodeEntities: false
                });
                var dom = $('._image-items');
                var items = [];
                dom.find('.image-item').each(function (i, elem) {
                    var item = {};
                    item.thumbnail = $(this).find('._thumbnail').data('src');
                    item.type = $(this).find('._thumbnail').data('type');
                    item.id = $(this).find('._thumbnail').data('id');
                    item.userId = $(this).find('._thumbnail').data('user-id');
                    item.tag = $(this).find('._thumbnail').data('tags');
                    items[i] = item;
                });
                resObj.data = items;

            } else {
                resObj.code = 404;
                console.log('Get data error!');
            }

            res.send(resObj);

        });


});


var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log(`Express app listening at http://localhost:${port}`);
});