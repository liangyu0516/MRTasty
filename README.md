# MRTasty
![](https://i.imgur.com/ZnJRatx.png)
## Project Vision 專案目的
This project aims to help user find specific type of restaurant near every MRT station.
## How to Run the Project 專案建立
1. Clone the repo.
	```
	git clone https://github.com/liangyu0516/MRTasty.git
	```
2. Install MySQL and create a database named `MRTasty`.
3. Import database.
	```
	mysql -u <user_name> -p MRTasty < MRTasty.sql
	```
4 Create `process.env` as below.
	```
	PORT = 3100
	DB_HOST = <host for MySQL server>
	DB_USERNAME = <usename for MySQL server>
	DB_PASSWORD = <password for MySQL server>
	DB_DATABASE = "MRTasty"
	TOKEN_KEY = "b7b16ad9db0ca7c5705cba37840e4ec310740c62beea61cfd9bdcee0720797a6c8bb1b3ffc0d781601fb77dbdaa899acfd08ac560aec19f2d18bb3b6e25beb7a"
	```
2. Start server.
	```
	npm install
	node index.js
	```
3. Open one terminal for frontend.
	```
	cd fontend
	npm install
	npm start
	```
## Technique 使用技術
### Frontend
- Language : HTML / CSS / Javascript
- Framework : React.js
### Backend
- Language : Javascript
- Framework : Node.js / Express.js
### Database
- MySQL
### Web Crawler
- Language : Python
- Library : BeautifulSoup / Requests / Selenium
### Cloud Service
- Amazon Elastic Compute Cloud (Amazon EC2)
### Other Concepts and Technique
- Daemon process manager : PM2
- Reverse proxy : Nginx
- MVC design pattern
- Asynchronous : async / await
- RESTful APIs
- Google Maps APIs
- MOTC Transport APIs
- Reviews keyword analysis : jieba