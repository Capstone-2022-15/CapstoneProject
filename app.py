#Node.js에서 보낸 데이터를 수신할 Flask 서버

import json

import cv2
import requests
import sys

LIMIT_PX = 1024
LIMIT_BYTE = 1024*1024  # 1MB
LIMIT_BOX = 40

appkey = '5dd189980f4ba1c156c9a677cbe9a972'
#image_path = './images'



from flask import Flask, render_template, request, jsonify
#from kakao_image import *

app = Flask(__name__)



def kakao_ocr_resize(image_path: str): #이미지가 클 경 이미지를 처리하여 리사이즈 
    
    image = cv2.imread(image_path)
    height, width, _ = image.shape
    print(f"height : {height}, width : {width}")
    

    if LIMIT_PX < height or LIMIT_PX < width:
        ratio = float(LIMIT_PX) / max(height, width)
        image = cv2.resize(image, None, fx=ratio, fy=ratio)
        height, width, _ = height, width, _ = image.shape

        # api 사용전에 이미지가 resize된 경우, recognize시 resize된 결과를 사용해야함.
        image_path = "{}_resized.jpg".format(image_path)
        cv2.imwrite(image_path, image)

        return image_path
    return None


def kakao_ocr(image_path: str, appkey: str): #전처리한 이미지를 가지고 이미지에서 문자를 판단함
    
    API_URL = 'https://dapi.kakao.com/v2/vision/text/ocr'

    headers = {'Authorization': 'KakaoAK {}'.format(appkey)}

    image = cv2.imread(image_path)
    jpeg_image = cv2.imencode(".jpg", image)[1]
    data = jpeg_image.tobytes()


    return requests.post(API_URL, headers=headers, files={"image": data})


@app.route('/image', methods=['GET'])
def main():
    if len(sys.argv) != 3:
       print("Please run with args: $ python example.py /path/to/image appkey")
    image_path, appkey = '12345678-12345678.png', '5dd189980f4ba1c156c9a677cbe9a972'

    #image_path = '12345678-12345678.png'
    resize_impath = kakao_ocr_resize(image_path)
    if resize_impath is not None:
        image_path = resize_impath
        print("원본 대신 리사이즈된 이미지를 사용합니다.")

    output = kakao_ocr(image_path, appkey).json()
    #변경 전 한글 16진수로 나옴 print("[OCR] output:\n{}\n".format(json.dumps(output, sort_keys=True, indent=2)))
    print("[OCR] output:\n{}\n".format(json.dumps(output, sort_keys=True, indent=2, ensure_ascii=False))) # 변경 후
    

@app.route('/flask', methods=['GET'])
def index():
    return "Flask Hello"


if __name__ == "__main__":
    main()




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8800, debug = True)