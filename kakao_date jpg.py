import json

import cv2
import requests
import sys

import numpy as np


LIMIT_PX = 1024
LIMIT_BYTE = 1024*1024  # 1MB
LIMIT_BOX = 40

appkey = '5dd189980f4ba1c156c9a677cbe9a972'
#image_path = './images'

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


import re #정규표현식 사용

def main():
    if len(sys.argv) != 3:
       print("Please run with args: $ python example.py /path/to/image appkey")
    image_path, appkey = '12345678-123456784.JPG', '5dd189980f4ba1c156c9a677cbe9a972'

    #image_path = '12345678-12345678.png'
    resize_impath = kakao_ocr_resize(image_path)
    if resize_impath is not None:
        image_path = resize_impath
        print("원본 대신 리사이즈된 이미지를 사용합니다.")

    output = kakao_ocr(image_path, appkey).json()
    #변경 전 한글 16진수로 나옴 print("[OCR] output:\n{}\n".format(json.dumps(output, sort_keys=True, indent=2)))
    #print("[OCR] output:\n{}\n".format(json.dumps(output, sort_keys=True, indent=2, ensure_ascii=False))) # 변경 후
    outputdata = json.dumps(output, ensure_ascii = False, sort_keys =True, indent =2)
    

    #받은 데이터 array로 변환
    outputdata = json.loads(outputdata)

    if 'result' in outputdata :
      for i in range(len(outputdata['result'])):
        word = outputdata['result'][i]['recognition_words'][0]
        word = word.strip()
    
        x = outputdata['result'][i]['boxes'][0][0]
        y = outputdata['result'][i]['boxes'][0][1]
        w = outputdata['result'][i]['boxes'][1][0] - outputdata['result'][i]['boxes'][0][0]
        h = outputdata['result'][i]['boxes'][2][1] - outputdata['result'][i]['boxes'][0][1]

        # 원본 이미지
        org_img = cv2.imread(image_path)

        if word.find('2022') != -1:
          if re.search('\d', word) == None:
            
            nextX = outputdata['result'][i + 1]['boxes'][0][0]
            nextY = outputdata['result'][i + 1]['boxes'][0][1]
            nextW = outputdata['result'][i + 1]['boxes'][1][0] - outputdata['result'][i + 1]['boxes'][0][0]
            nextH = outputdata['result'][i + 1]['boxes'][2][1] - outputdata['result'][i + 1]['boxes'][0][1]

            # 자른 이미지
            cut_img = org_img[y:y+h, x:x+w]
            cut_img2 = org_img[y:nextY+nextH]

            # 자른 이미지 출력
            cut_img
            cut_img2
            word = outputdata['result'][i]['recognition_words'][0]
            if re.search('\d', outputdata['result'][i + 1]['recognition_words'][0]) == None:
              continue 
          else :
            # 자른 이미지
            cut_img = org_img[y:y+h, x:x+w]
            # 자른 이미지 출력
            cut_img

          # 양 끝에 하이폰 있으면 제거
          word = word.strip('-')
          print(word)

    else:
       print('사진 인식 실패')


if __name__ == "__main__":
    main()

