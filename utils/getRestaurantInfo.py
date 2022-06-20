from tkinter import E
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
payload = {}
headers = {}
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

# Get info of all restaurants
cur.execute("SELECT * FROM RESTAURANT")
restaurants = cur.fetchall()

for restaurant in restaurants:
	url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + restaurant[4] + "&language=zh-TW&key=" + GOOGLE_API_KEY
	response = requests.request("GET", url, headers = headers, data = payload)

	# Address
	try:
		cur.execute("UPDATE RESTAURANT SET Address = '" + json.loads(response.text)['result']['formatted_address'] + "' WHERE Place_id = '" + restaurant[4] + "'")
		db.commit()
	except:
		pass

	# Phone
	try:
		cur.execute("UPDATE RESTAURANT SET Phone = '" + json.loads(response.text)['result']['formatted_phone_number'] + "' WHERE Place_id = '" + restaurant[4] + "'")
		db.commit()
	except:
		pass
	
	# Website
	try:
		cur.execute("UPDATE RESTAURANT SET Website = '" + json.loads(response.text)['result']['website'] + "' WHERE Place_id = '" + restaurant[4] + "'")
		db.commit()
	except:
		pass

	# Opening_hours
	try:
		cur.execute("UPDATE RESTAURANT SET Opening_hours = '" + json.dumps(json.loads(response.text)['result']['opening_hours']['weekday_text'], ensure_ascii=False) + "' WHERE Place_id = '" + restaurant[4] + "'")
		db.commit()
	except:
		pass

db.close()
