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

# Get info of all stations
cur.execute("SELECT * FROM Station")
stations = cur.fetchall()

for s in stations:
	sid = s[0]
	latitude = s[4]
	longitude = s[5]

	for r in range(500, 99, -100):
		if r == 500:
			url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + str(latitude) + "," + str(longitude) + "&radius=" + str(r) + "&keyword=拉麵&language=zh-TW&key=" + GOOGLE_API_KEY
			response = requests.request("GET", url, headers = headers, data = payload)
			for restaurant in json.loads(response.text)['results']:
				try:
					cur.execute("INSERT INTO RESTAURANT (Sid, Type, Distance, Place_id, Name, Rating, Total_ratings, Photo_reference) VALUES (" + str(sid) + ", '拉麵', 500, '" + restaurant['place_id'] + "', '" + restaurant['name'] + "', " + str(restaurant['rating']) + ", " + str(restaurant['user_ratings_total']) + ", '" + restaurant['photos'][0]['photo_reference'] + "')")
				except KeyError:
					cur.execute("INSERT INTO RESTAURANT (Sid, Type, Distance, Place_id, Name, Rating, Total_ratings) VALUES (" + str(sid) + ", '拉麵', 500, '" + restaurant['place_id'] + "', '" + restaurant['name'] + "', " + str(restaurant['rating']) + ", " + str(restaurant['user_ratings_total']) + ")")
				except:
					pass
				db.commit()
			while 1:    
				try:
					url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + GOOGLE_API_KEY + "&pagetoken=" + json.loads(response.text)['next_page_token']
					response = requests.request("GET", url, headers = headers, data = payload)
					for restaurant in json.loads(response.text)['results']:
						try:
							cur.execute('INSERT INTO RESTAURANT (Sid, Distance, Place_id, Name, Rating, Total_ratings, Photo_reference) VALUES (' + str(sid) + ', 500, "' + restaurant['place_id'] + '", "' + restaurant['name'] + '", ' + str(restaurant['rating']) + ', ' + str(restaurant['user_ratings_total']) + ', "' + restaurant['photos'][0]['photo_reference'] + '")')
						except KeyError:
							cur.execute('INSERT INTO RESTAURANT (Sid, Distance, Place_id, Name, Rating, Total_ratings) VALUES (' + str(sid) + ', 500, "' + restaurant['place_id'] + '", "' + restaurant['name'] + '", ' + str(restaurant['rating']) + ', ' + str(restaurant['user_ratings_total']) + ')')
						db.commit()
				except:
					break
		else:
			url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + str(latitude) + "," + str(longitude) + "&radius=" + str(r) + "&keyword=拉麵&language=zh-TW&key=" + GOOGLE_API_KEY
			response = requests.request("GET", url, headers = headers, data = payload)
			for restaurant in json.loads(response.text)['results']:
				cur.execute("UPDATE RESTAURANT SET Distance = " + str(r) + " WHERE Place_id = '" + restaurant['place_id'] + "'")
				db.commit()
			while 1:    
				try:
					url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + GOOGLE_API_KEY + "&pagetoken=" + json.loads(response.text)['next_page_token']
					response = requests.request("GET", url, headers = headers, data = payload)
					for restaurant in json.loads(response.text)['results']:
						cur.execute("UPDATE RESTAURANT SET Distance = " + str(r) + " WHERE Place_id = '" + restaurant['place_id'] + "'")
						db.commit()
				except:
					break

db.close()
