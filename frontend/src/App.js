// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Header from './components/Header'
import Map from './pages/Map'
import Restaurant from './pages/Restaurant'
import Profile from './pages/Profile'
import Modal from './components/Modal'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import cookies from "js-cookies";

function App() {
	const [type, setType] = useState('')
	const [station, setStation] = useState()
	const [isSelected, setIsSelected] = useState(false)
	const [restaurants, setRestaurants] = useState([])
	const [token, setToken] = useState(cookies.getItem('access_token'))

	return (
		<Router>
			<div className="App">
			<Header type={type} setType={setType} token={token} setToken={setToken}/>
				<Routes>
					<Route path="/" element={<Map type={type} setStation={setStation} setIsSelected={setIsSelected} setRestaurants={setRestaurants}/>} />
					<Route path="/restaurant/:place_id" element={<Restaurant token={token}/>} />
					<Route path="/profile" element={<Profile token={token} />} />
				</Routes>
			</div>
			{isSelected && <Modal station={station} setIsSelected={setIsSelected} restaurants={restaurants}/>}
		</Router>
	);
}

export default App;
