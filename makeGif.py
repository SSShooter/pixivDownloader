import os
import os.path
from PIL import Image
import imageio
images = []

root = input('select folder')
for parent,dirnames,filenames in os.walk(root):    #三个参数：分别返回1.父目录 2.所有文件夹名字（不含路径） 3.所有文件名字
    for filename in filenames:                        #输出文件信息
        img = Image.open(os.path.join(parent,filename))
        images.append(imageio.imread(os.path.join(parent,filename)))

imageio.mimsave('movie.gif', images)