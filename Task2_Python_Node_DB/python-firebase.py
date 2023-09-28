
import requests 
import base64

def encode_image_as_base64(image_path):
    with open(image_path, 'rb') as image_file:
        image_data = base64.b64encode(image_file.read()).decode('utf-8')
    return image_data

def SendFrameToServer(url, ImagePath):
    image_data = encode_image_as_base64(ImagePath)
    image_json = {"image_data": image_data}
    response = requests.post(url, json=image_json)

    if response.status_code == 200:
        print('Image uploaded successfully')
    else:
        print('Image upload failed:', response.status_code, response.text)

if __name__ == '__main__':
    url = 'http://localhost:5000/Frame'
    SendFrameToServer(url,'image.jpg') 
    