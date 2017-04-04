from urllib import request
import requests
import re
id = input("Enter id:")
url = 'http://120.76.217.199:3000/getpic/'+id
r = requests.get(url)
print(r.status_code)

res_dic = r.json()

url = res_dic['data']
p = re.compile(r'^.+/img(.+)_p0.+$')
test = p.findall(url)
dateid = test[0]
pic_req_url1 = 'https://i.pximg.net/img-original/img' + dateid + '_p0.png'
pic_req_url2 = 'https://i.pximg.net/img-original/img' + dateid + '_p0.jpg'
referer = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id='+id
print(pic_req_url1)
print(referer)


try:
    req = request.Request(pic_req_url1)
    req.add_header('referer', referer)
    f = request.urlopen(req)
    print('Status:', f.status, f.reason)
    pic = f.read()
    with open(id + '.jpg', 'wb') as file_object:
        file_object.write(pic)
except Exception as e:
    print('Error:', e)
    try:
        req = request.Request(pic_req_url2)
        req.add_header('referer', referer)
        f = request.urlopen(req)
        print('Status:', f.status, f.reason)
        pic = f.read()
        with open(id + '.jpg', 'wb') as file_object:
            file_object.write(pic)
    except Exception as e:
        print('Error:', e)
        print('get pic fail')


