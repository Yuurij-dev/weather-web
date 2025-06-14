import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import City from './pages/City/City.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city" element={<City />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;