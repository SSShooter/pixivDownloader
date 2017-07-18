var rp = require('request-promise');
var request = require('request');
const fs = require('fs');
const rimraf = require('rimraf');
const AdmZip = require('adm-zip');
var GifEncoder = require('gif-encoder');
var getPixels = require("get-pixels");
var jpeg = require('jpeg-js')
var readlineSync = require('readline-sync');


//清空temp文件夹
rimraf.sync('temp');
fs.mkdirSync('temp');

var id = readlineSync.question('input id: ');
let url = 'http://120.76.217.199:3000/getpic/' + id;
request.get(url, (err, res, body) => {
  if (!err && res.statusCode == 200) {
    let referer = 'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + id;
    let src = JSON.parse(body).data.src;
    let itype = JSON.parse(body).itype;
    let reg = itype === 'pic' ? /^.+\/img(.+)_p0.+$/ : /^.+\/img(.+)_square1200.+$/;
    let date = reg.exec(src)[1];
    if (itype === 'pic') {
      var promises1 = [];
      for (let i = 0; i < 100; i++) {
        promises1.push(getPicPromise(id, referer, date, i, 'jpg'));
      }
      Promise.all(promises1).then(function (value) {
        console.log(value);
      },function(err){
      });
      var promises2 = [];
      for (let i = 0; i < 100; i++) {
        promises2.push(getPicPromise(id, referer, date, i, 'png'));
      }
      Promise.all(promises2).then(function (value) {
        console.log(value);
      },function(err){
      });
    } else {
      getGif(id, referer, date);
    }
  }
});
var getPicPromise = function (id, referer, date, page, format) {
  return new Promise(function (resolve, reject) {
    let option = {
      url: 'https://i.pximg.net/img-original/img' + date + '_p' + page + '.' + format,
      headers: {
        'referer': referer
      },
      method: 'GET'
    };
    request(option)
      .on('response', function (response) {
        if (response.statusCode !== 404) {
          this.pipe(fs.createWriteStream(id + '_p' + page + "." + format));
          resolve('ok');
        } else {
          reject('404');
        }
      })
  });
};

function getGif(id, referer, date) {
  let option = {
    url: 'https://i2.pixiv.net/img-zip-ugoira/img' + date + '_ugoira600x600.zip',
    headers: {
      'referer': referer
    },
    method: 'GET'
  }
  var stream = fs.createWriteStream('temp/' + id + '.zip');
  request(option).pipe(stream).on('close', function () {
    makeGif(id);
  });
}

function makeGif(id) {
  var file = fs.createWriteStream(id + '.gif');
  var zip = new AdmZip('temp/' + id + '.zip');
  var zipEntries = zip.getEntries();
  var wh = jpeg.decode(zip.readFile(zipEntries[0]));
  var gif = new GifEncoder(wh.width, wh.height);
  gif.pipe(file);
  gif.writeHeader();
  zipEntries.forEach((zipEntry) => {
    gif.read(1024 * 1024);
    var data = zip.readFile(zipEntry);
    var pixels = jpeg.decode(data).data;
    gif.addFrame(pixels);
  });
  gif.read(1024 * 1024);
  gif.finish();
}