import logo from './logo.svg';
import './App.css';
import { Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/js/Navbar';
import Login from './Components/Login/js/Login';
import Register from './Components/Register/js/Register';
import Profile from './Components/Profile/js/Profile';
import Home from './Components/Home/js/Home';
import Showpost from './Components/Showpost/js/Showpost';
import Footer from './Components/Footer/js/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route exact path="/showpost/:id" Component={Showpost} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
