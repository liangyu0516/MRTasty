import urllib.request as req
import json
import pandas as pd
import numpy as np
import requests
from sqlalchemy import create_engine
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import re
import json
import time
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
cur.execute("SELECT Name FROM RESTAURANT")
names = cur.fetchall()

#建立chromedriver
options = Options()
options.add_argument("--disable-notifications")
chrome = webdriver.Chrome('./chromedriver')

fail = 0
for name in list(r[0] for r in names)[:10]:
	try:
		chrome.get("https://www.google.com.tw/maps")
		
		#輸入店名
		search = chrome.find_element(by = By.ID, value = 'searchboxinput')
		search.send_keys(name)
		time.sleep(10)
		search.send_keys(Keys.ENTER)
		time.sleep(10)

		#跳轉至評論頁面
		chrome.find_element(by = By.XPATH, value = "//button[@jsaction='pane.rating.moreReviews']").click()
		time.sleep(10)

		#載入前100筆重要度較高之評價
		for i in range(10):
			scrollable_div = chrome.find_element(by = By.XPATH, value = '//div[@class="m6QErb DxyBCb kA9KIf dS8AEf"]')
			chrome.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div)
			time.sleep(2)

		soup = BeautifulSoup(chrome.page_source, 'html.parser')
		reviews = soup.findAll('span', {'class' : 'wiI7pd'})
		times = soup.findAll('span', {'class' : 'rsqaWe'})
		rates = soup.findAll('span', {'class' : 'kvMYJc'})
		""" for rate in rates:
			print(rate['aria-label']) 
		print(len(reviews))
		print(len(times))
		print(len(rates)) """
	except Exception as e:
		fail += 1
		print('Error:', e)
		print('Fail to find reviews:', name, '\n')
print('Total failed:', fail)
#印出頁面
""" soup = BeautifulSoup(chrome.page_source, 'html.parser')
print(soup) """