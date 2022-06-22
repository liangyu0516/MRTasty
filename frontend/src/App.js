// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Header from './components/Header'
import Map from './pages/Map'
import Restaurant from './pages/Restaurant'
import Modal from './components/Modal'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
	const [type, setType] = useState('')
	const [isSelected, setIsSelected] = useState(false)
	console.log(isSelected)
	return (
		<Router>
			<div className="App">
			<Header setType={setType}/>
				<Routes>
				<Route path="/" element={<Map type={type} setIsSelected={setIsSelected}/>} />
				<Route path="/restaurant/:place_id" element={<Restaurant />} />
				</Routes>
			</div>
			{isSelected && <Modal setIsSelected={setIsSelected} />}
		</Router>
	);
}

export default App;
