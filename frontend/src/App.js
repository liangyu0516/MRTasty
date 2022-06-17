// import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Map from './pages/Map'
import Restaurant from './pages/Restaurant'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/restaurant/:place_id" element={<Restaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
