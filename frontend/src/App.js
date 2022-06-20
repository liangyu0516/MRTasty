// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import Header from './components/Header'
import Map from './pages/Map'
import Restaurant from './pages/Restaurant'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
	const [type, setType] = useState('')

	return (
		<Router>
		<div className="App">
		<Header setType={setType} />
			<Routes>
			<Route path="/" element={<Map type={type}/>} />
			<Route path="/restaurant/:place_id" element={<Restaurant />} />
			</Routes>
		</div>
		</Router>
	);
}

export default App;
