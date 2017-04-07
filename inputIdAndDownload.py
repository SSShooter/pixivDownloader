from urllib import request
import requests
import re

def main():
    id = input("Enter id:")
    url = 'http://120.76.217.199:3000/getpic/'+id
    r = requests.get(url)
    res_dic = r.json()
    url = res_dic['data']
    p_dateid = re.compile(r'^.+/img(.+)_p0.+$')
    dateid = p_dateid.findall(url)[0]
    referer = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id='+id

    def getPic(format, page):
        req = request.Request('https://i.pximg.net/img-original/img' + dateid + '_p'+ str(page) +'.'+format)
        req.add_header('referer', referer)
        f = request.urlopen(req)
        pic = f.read()
        file_object = open(id + '_p' + str(page) + '.' + format, 'wb')
        file_object.write(pic)
        file_object.close()
        print('p',page,'downloaded')

    try:
        for num1 in range(200):
            getPic('jpg',num1)
    except Exception as e:
        try:
            for num2 in range(200):
                getPic('png',num2)
        except Exception as e:
            print('finish\n')
    finally:main()

main()