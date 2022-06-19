import re
import requests 
import json
import random
import jieba
import jieba.analyse
import time

j = 0
all_reviews_text = ''
headers = {
	"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
	"Accept-Encoding": "gzip, deflate, br", 
	"Accept-Language": "zh-TW,zh;q=0.9", 
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
}
delay_choices = [1.3, 0.3, 0.8, 1.5, 1, 0.5]  #延遲的秒數
delay = random.choice(delay_choices)  #隨機選取秒數

while(j < 500):
	print(j)
	#url = "https://www.google.com.tw/maps/preview/review/listentitiesreviews?authuser=0&hl=zh-TW&gl=tw&pb=!1m2!1y3765762734390772041!2y17055821615375049737!2m2!1i"+ str(j) +"!2i10!3e1!4m5!3b1!4b1!5b1!6b1!7b1!5m2!1siMZEYbemFIeymAWI2pko!7e81"
	# 鳥人：
	url = "https://www.google.com/maps/preview/review/listentitiesreviews?authuser=0&hl=zh-TW&gl=tw&pb=!1m2!1y3765761193709017321!2y4062972864771442104!2m2!1i"+ str(j) +"!2i10!3e1!4m5!3b1!4b1!5b1!6b1!7b1!5m2!1sjc-uYua0M4jm0QTavbuwBA!7e81"
	j = j + 10
		
	text = requests.get(url, headers=headers)
	text.encoding = 'utf-8'
	text = text.text
	pretext = ')]}\'' # 取代特殊字元
	text = text.replace(pretext,' ') # 把字串讀取成json
	#print('text:', text)
	soup = json.loads(text) # 載入json檔

	review_list = soup[2] # 留言的位置
	if review_list is None:
		break 
	else:
		for r in review_list:
			if r[3] is not None:
				all_reviews_text += r[3]
	
	time.sleep(delay)  #延遲
#print(all_reviews_text)


#擷取文章前十大關鍵字
jieba.analyse.set_stop_words('./stop_words.txt')
tags= jieba.analyse.extract_tags(all_reviews_text, topK=30, withWeight=True)
for tag, weight in tags:
	print(tag + "," + str(int(weight * 10000)))
