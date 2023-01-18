
import './App.css';
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import Showdata from './componet/Showdata';
import Login1 from '../src/componet/validation/Login1'
import Admin from './componet/Admin/Admin';
import Role from './componet/Admin/Role';
import Navbar from './componet/Navbar';
import Permission from './componet/Admin/Permission';
import Login from './componet/Admin/Login';
import Home from './componet/Admin/Home';

function App() {
  const location = useLocation()

console.log(location);

  return (

    <>
  {location.pathname != '/' ?  <Navbar/>: ""}
   
      <Routes>
      <Route path='/' element={<Login/>}/>

        <Route path='/show' element={<Showdata />} />
        <Route path='/Login1' element={<Login1/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/role' element={<Role/>}/>
        <Route path='/permission' element={<Permission/>}/>
        <Route path='/home' element={<Home/>}/>





      </Routes>
  
    </>
   
  );
}

export default App;
