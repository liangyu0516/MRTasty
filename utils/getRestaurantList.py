import requests
import json
import ast
import os
import MySQLdb
from dotenv import load_dotenv

load_dotenv('../process.env')
db = MySQLdb.connect(
    host = os.getenv('DB_HOST'),
    user = os.getenv('DB_USERNAME'),
    passwd = os.getenv('DB_PASSWORD'),
    db = os.getenv('DB_DATABASE'),
)      
cur = db.cursor()

# Use all the SQL you like
cur.execute("SELECT * FROM Station")
myresult = cur.fetchall()

for x in myresult:
  print(x)

db.close()


""" 

payload = {}
headers = {}
for r in range(500, 99, -100):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=25.0526,121.52&radius=" + str(r) + "&keyword=拉麵&language=zh-TW&key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY"
    response = requests.request("GET", url, headers=headers, data=payload)
    print(json.loads(response.text)['results'])
    for i in range(len(json.loads(response.text)['results'])):
        print(json.loads(response.text)['results'][i]['name'])
    while 1:    
        try:
            url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDy-ncnSDLOJlt_3nqom7swxEfaV4ogfIY&pagetoken=" + json.loads(response.text)['next_page_token']
            response = requests.request("GET", url, headers=headers, data=payload)
            print(json.loads(response.text)['results'])
            for i in range(len(json.loads(response.text)['results'])):
                print(json.loads(response.text)['results'][i]['name'])
        except:
            break """