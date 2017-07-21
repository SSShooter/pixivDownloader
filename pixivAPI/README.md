# pixivAPI
simple pixivAPI 

## Install
### step1
```
git clone https://github.com/ssshooter/pixivAPI
```
### step2
```
cd pixivAPI
npm install
```
### step3
```
node index
```

## Use     
### search illustration by keyword       
open in browser        
http://localhost:3000/searchpic/:keyword/:star            
star parameter is required     
for example          
http://120.76.217.199:3000/searchpic/loveplus/0    
or     
http://120.76.217.199:3000/searchpic/shadowverse/1000     
return json like this      
```
{
    "code": 200,
    "data": [
        {
            "thumbnail": "https://i.pximg.net/c/150x150/img-master/img/2016/08/23/14/28/54/58606865_p0_master1200.jpg",
            "type": "illust",
            "id": 58606865,
            "userId": 30254,
            "tag": "ShadowVerse エルフ アリサ シャドウバース シャバス1000users入り マント 長手袋 アリサ(シャドウバース) CLIPSTUDIOPAINT"
        },
        {
            "thumbnail": "https://i.pximg.net/c/150x150/img-master/img/2016/07/10/00/10/43/57826683_p0_master1200.jpg",
            "type": "illust",
            "id": 57826683,
            "userId": 711526,
            "tag": "シャドウバース Shadowverse アリサ エルフ 魅惑のふともも 長手袋 尻神様 サイハイブーツ シャバス1000users入り CLIPSTUDIOPAINT"
        },
        {
            "thumbnail": "https://i.pximg.net/c/150x150/img-master/img/2016/07/02/00/10/22/57687804_p0_master1200.jpg",
            "type": "illust",
            "id": 57687804,
            "userId": 711526,
            "tag": "シャドウバース Shadowverse エリカ メイド シャバス1000users入り ふともも エリカ(シャドウバース) CLIPSTUDIOPAINT"
        }
    ]
}
```
### get detail
open in browser       
http://localhost:3000/getpic/id      
for example         
http://120.76.217.199:3000/getpic/62273917      
return json like this   
```
{
    "code": 200,
    "data": {
        "thumbnail_": "https://i.pximg.net/c/600x600/img-master/img/2017/04/06/00/01/43/62273917_p0_master1200.jpg",
        "src": "https://i.pximg.net/c/128x128/img-master/img/2017/04/06/00/01/43/62273917_p0_square1200.jpg"
    },
    "itype": "pic"
}
```
(if you input a id of ugoira,it will not return data.thumbnail_)       



