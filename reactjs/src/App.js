import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showdata from './componet/Showdata';
import Login1 from '../src/componet/validation/Login1'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/show' element={<Showdata />} />
        <Route path='/' element={<Login1/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
