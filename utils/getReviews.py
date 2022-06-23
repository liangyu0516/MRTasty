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
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import json
import time
import ast
import os
import MySQLdb
import jieba
import jieba.analyse
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

"""
fail = 0
for name in list(r[0] for r in names)[:10]:
	try:
		 chrome.get("https://www.google.com.tw/maps")
		
		#輸入店名
		element = WebDriverWait(chrome, 10).until(
			EC.presence_of_element_located((By.ID, "searchboxinput"))
		)
		search = chrome.find_element(by = By.ID, value = 'searchboxinput')
		search.send_keys(name)
		time.sleep(10)
		search.send_keys(Keys.ENTER)
		time.sleep(10)

		#跳轉至評論頁面
		element = WebDriverWait(chrome, 100).until(
			EC.element_to_be_clickable((By.XPATH, "//button[@jsaction='pane.rating.moreReviews']"))
		)
		chrome.find_element(by = By.XPATH, value = "//button[@jsaction='pane.rating.moreReviews']").click()
		time.sleep(10)

		#載入前100筆重要度較高之評價
		for i in range(10):
			element = WebDriverWait(chrome, 10).until(
				EC.presence_of_element_located((By.XPATH, '//div[@class="m6QErb DxyBCb kA9KIf dS8AEf"]'))
			)
			scrollable_div = chrome.find_element(by = By.XPATH, value = '//div[@class="m6QErb DxyBCb kA9KIf dS8AEf"]')
			chrome.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div)
			time.sleep(2)

		soup = BeautifulSoup(chrome.page_source, 'html.parser')
		reviews = soup.findAll('span', {'class' : 'wiI7pd'})
		times = soup.findAll('span', {'class' : 'rsqaWe'})
		rates = soup.findAll('span', {'class' : 'kvMYJc'})
		
		for rate in rates:
			print(rate['aria-label']) 
		print(len(reviews))
		print(len(times))
		print(len(rates))
	except Exception as e:
		fail += 1
		print('Error:', e)
		print('Fail to find reviews:', name, '\n') 
print('Total failed:', fail) """

chrome.get("https://www.google.com.tw/maps")

#輸入店名
element = WebDriverWait(chrome, 10).until(
    EC.presence_of_element_located((By.ID, "searchboxinput"))
)
search = chrome.find_element(by = By.ID, value = 'searchboxinput')
search.send_keys('一蘭 台灣台北本店')
search.send_keys(Keys.ENTER)


#跳轉至評論頁面
element = WebDriverWait(chrome, 100).until(
    EC.element_to_be_clickable((By.XPATH, "//button[@jsaction='pane.rating.moreReviews']"))
)
chrome.find_element(by = By.XPATH, value = "//button[@jsaction='pane.rating.moreReviews']").click()
time.sleep(10)

#載入前100筆重要度較高之評價
for i in range(9):
	element = WebDriverWait(chrome, 10).until(
		EC.presence_of_element_located((By.XPATH, '//div[@class="m6QErb DxyBCb kA9KIf dS8AEf"]'))
	)
	scrollable_div = chrome.find_element(by = By.XPATH, value = '//div[@class="m6QErb DxyBCb kA9KIf dS8AEf"]')
	chrome.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div)
	time.sleep(2)

#載入完整的評論
while 1:
	try:
		chrome.find_element(by = By.XPATH, value = "//button[@aria-label='顯示更多']").click()
	except:
		break
soup = BeautifulSoup(chrome.page_source, 'html.parser')
reviews = soup.findAll('span', {'class' : 'wiI7pd'})
times = soup.findAll('span', {'class' : 'rsqaWe'})
rates = soup.findAll('span', {'class' : 'kvMYJc'})

all_reviews_text = ''
for i in range(len(rates)):
	print(rates[i]['aria-label'].split(' ')[1]) 
	print(times[i].text) 
	print(reviews[i].text)
	cur.execute('INSERT INTO REVIEW (Rid, Time, Rate, Content) VALUES (18, "' + times[i].text + '", ' + rates[i]['aria-label'].split(' ')[1] + ', "'  + reviews[i].text + '")')
	db.commit()
	all_reviews_text += reviews[i].text

#擷取文章前十大關鍵字
jieba.analyse.set_stop_words('./stop_words.txt')
tags= jieba.analyse.extract_tags(all_reviews_text, topK=30, withWeight=True)
for tag, weight in tags:
	print(tag + "," + str(int(weight * 10000)))


#印出頁面
""" soup = BeautifulSoup(chrome.page_source, 'html.parser')
print(soup) """