from urllib import request
import requests
import re
import imageio
from zipfile import *

def getGif():
    req = request.Request('https://i2.pixiv.net/img-zip-ugoira/img'+ dateid +'_ugoira600x600.zip')
    req.add_header('referer', referer)
    req.add_header('Origin', 'http://www.pixiv.net')
    f = request.urlopen(req)
    gif = f.read()
    file_object = open('temp/'+ id + '.zip', 'wb')
    file_object.write(gif)
    file_object.close()

    print('gif downloaded')

def getPic(format, page):
    req = request.Request('https://i.pximg.net/img-original/img' + dateid + '_p'+ str(page) +'.'+format)
    req.add_header('referer', referer)
    f = request.urlopen(req)
    pic = f.read()
    file_object = open(id + '_p' + str(page) + '.' + format, 'wb')
    file_object.write(pic)
    file_object.close()
    print('p',page,'downloaded')

while(1):
    id = input("Enter id:")
    url = 'http://120.76.217.199:3000/getpic/'+id
    r = requests.get(url)
    res_dic = r.json()
    url = res_dic['data']['src']
    # 是gif还是pic
    itype = res_dic['itype']
    if (itype=='pic'): 
        p_dateid = re.compile(r'^.+/img(.+)_p0.+$')
    else:
        p_dateid = re.compile(r'^.+/img(.+)_square1200.+$')
    dateid = p_dateid.findall(url)[0]
    referer = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id='+id

    if (itype=='pic'): 
        try:
            for num1 in range(200):
                getPic('jpg',num1)
        except Exception as e:
            try:
                for num2 in range(200):
                    getPic('png',num2)
            except Exception as e:
                print('finish\n')
    else:
        getGif()
        print('finish\n')