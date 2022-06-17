// import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Map from './pages/Map'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
