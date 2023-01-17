import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showdata from './componet/Showdata';
import Login1 from '../src/componet/validation/Login1'
import Admin from './componet/Admin/Admin';
import Role from './componet/Admin/Role';
import Navbar from './componet/Navbar';
import Permission from './componet/Admin/Permission';
import Login from './componet/Admin/Login';
import Home from './componet/Admin/Home';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path='/' element={<Login/>}/>

        <Route path='/show' element={<Showdata />} />
        <Route path='/Login1' element={<Login1/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/role' element={<Role/>}/>
        <Route path='/permission' element={<Permission/>}/>
        <Route path='/home' element={<Home/>}/>





      </Routes>
    </BrowserRouter>
  );
}

export default App;
