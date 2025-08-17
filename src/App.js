import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Cards from './pages/Cards';
import Table from './pages/Table';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndividualCard from './pages/IndividualCard';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/cards/:id' element={<IndividualCard />} />
        <Route path='/table' element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
