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

#建立chromedriver
options = Options()
options.add_argument("--disable-notifications")
chrome = webdriver.Chrome('./chromedriver')
chrome.get("https://www.google.com.tw/maps")

#輸入店名
search = chrome.find_element(by = By.ID, value = 'searchboxinput')
search.send_keys('一蘭 台灣台北本店')
search.send_keys(Keys.ENTER)
time.sleep(10)

#跳轉至評論頁面
chrome.find_element(by = By.XPATH, value = "//button[@jsaction='pane.rating.moreReviews']").click()
time.sleep(10)

#印出頁面
""" soup = BeautifulSoup(chrome.page_source, 'html.parser')
print(soup) """

for i in range(10):
	scrollable_div = chrome.find_element(by = By.XPATH, value = '//div[@class="m6QErb DxyBCb kA9KIf dS8AEf"]')
	chrome.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', scrollable_div)
	time.sleep(2)

soup = BeautifulSoup(chrome.page_source, 'html.parser')
reviews = soup.findAll('span', {'class' : 'wiI7pd'})
print(reviews)
print(len(reviews))