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

# Get info of all restaurants
cur.execute("SELECT * FROM RESTAURANT")
restaurants = cur.fetchall()

for restaurant in restaurants:
	cur.execute("SELECT COUNT(REVIEW.REid) FROM REVIEW, RESTAURANT WHERE RESTAURANT.Place_id = '" + restaurant[4] + "' and REVIEW.Rid = RESTAURANT.Rid")
	total_ratings = cur.fetchall()[0][0]
	cur.execute("SELECT AVG(REVIEW.Rate) FROM REVIEW, RESTAURANT WHERE RESTAURANT.Place_id = '" + restaurant[4] + "' and REVIEW.Rid = RESTAURANT.Rid")
	((result, ), ) = cur.fetchall()
	if result != None:
		avg_ratings = float("{:.1f}".format(float(result)))
		cur.execute("UPDATE RESTAURANT SET Rating = " + str(avg_ratings) + ", Total_ratings = " + str(total_ratings) + " WHERE Place_id = '" + restaurant[4] + "'")
	else:
		cur.execute("UPDATE RESTAURANT SET Total_ratings = " + str(total_ratings) + " WHERE Place_id = '" + restaurant[4] + "'")
	db.commit()