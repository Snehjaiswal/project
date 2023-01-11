import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showdata from './componet/Showdata';
import Loginpage from './componet/Loginpage';
import { LoginForm } from './componet/validation/LoginForm';
import ValidatedLoginForm from './componet/validation/ValidatedLoginForm';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/show' element={<Showdata />} />
        <Route path='/' element={<ValidatedLoginForm />} />
        <Route path='/a' element={<Loginpage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
