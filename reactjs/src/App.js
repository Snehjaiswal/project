import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showdata from './componet/Showdata';
import Login1 from '../src/componet/validation/Login1'
import Admin from './componet/Admin/Admin';
import Role from './componet/Admin/Role';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/show' element={<Showdata />} />
        <Route path='/' element={<Login1/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/role' element={<Role/>}/>




      </Routes>
    </BrowserRouter>
  );
}

export default App;
