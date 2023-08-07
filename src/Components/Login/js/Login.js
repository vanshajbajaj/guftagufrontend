import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./../css/Login.css";
import { AuthContext } from '../../../Context/AuthContext';
import login1 from "./../assets/login1.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const navigate = useNavigate();

  const { isLoggedIn, toggleIsLoggedIn } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "", password: ""
  });

  let name, value;

  const handleInputs = (e) => {

    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });

  }

  const LoginUser = async (e) => {

    e.preventDefault();
    const {email,password} = user;

    console.log(email, password);

    const res = await fetch("/api/signin", {
      method: "POST",
      // credentials:'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // console.log("hello");
    if (res.status == 400 || !data) {
      // window.alert("Invalid Credentials");
      toast.error('Invalid Credentials', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }

    else {

      toggleIsLoggedIn();
      console.log(isLoggedIn);
      // window.alert("Logged in Successfully");
      toast.success('Logged In Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      navigate('/');

    }

  }

  return (
    <>

      <div id="loginmain">

        <div className='logindivs' id='logindivleft'>

          <img src='
          https://media3.giphy.com/media/d15kGggSJHwn7lGPrf/giphy.gif?cid=ecf05e47btv3y1lnc4wke1gxw5ivlfux6kb8atqc3b0ra80t&ep=v1_gifs_search&rid=giphy.gif&ct=g
          ' id="registerleftlogo"></img>



        </div>

        {/* <div className='registerdivs' id="registerdivmid">

        </div> */}

        <div className='logindivs' id="logindivright">
          <div id="ldrtext">

            <span id="ldrhead">Welcome to <span id="ldrheadlogo">GUFTAGU</span></span>
            <span id="ldrinfo">PLEASE ENTER YOUR DETAILS TO LOGIN.</span>

          </div>
          <div id="ldrformd">

            <form id="ldrform" method='POST'>

              <section className='ldrforminpgroup'>
                <label htmlFor='email'>
                  <i className="ldrformicon zmdi zmdi-email material-icons-name"></i>
                </label>
                <input className="ldrforminp" type="email" name='email' id='email' value={user.email} onChange={handleInputs} placeholder='Your Email' required></input>
              </section>

              <section className='ldrforminpgroup'>
                <label htmlFor='password'>
                  <i className="ldrformicon zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input className="ldrforminp" type="password" name='password' id='password' value={user.password} onChange={handleInputs} placeholder='Your Password' required></input>
              </section>

              <input type="submit" name='signup' id='signup' onClick={LoginUser} className="ldrformbt" value="Login"></input>

              <Link id="ldrlink" to='/register'>New user?</Link>

            </form>

          </div>
        </div>

      </div>

      <ToastContainer />
    </>
  )

}

export default Login;