import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./../css/Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "", age: "", email: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {

        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });

    }

    const PostData = async (e) => {

        e.preventDefault();

        const { name, age, email, password, cpassword } = user;

        const res = await fetch('/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, age, email, password, cpassword
            })
        });

        const data = await res.json();

        if (res.status == 422 || res.status == 401 || res.status == 500 || !data) {
            console.log("Invalid Registeration");
            // window.alert("Invalid Registeration");
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
            console.log("Successful Registeration");
            // window.alert("Successful Registeration");
            toast.success('Registered Successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            navigate('/login');
        }


    }

    return (
        <>

            <div id="registermain">

                <div className='registerdivs'>

                    {/* <img src={logo4} id="registerleftlogo"></img> */}
                    <img src='
          https://media3.giphy.com/media/d15kGggSJHwn7lGPrf/giphy.gif?cid=ecf05e47btv3y1lnc4wke1gxw5ivlfux6kb8atqc3b0ra80t&ep=v1_gifs_search&rid=giphy.gif&ct=g
          ' id="registerleftlogo"></img>

                </div>

                {/* <div className='registerdivs' id="registerdivmid">

        </div> */}

                <div className='registerdivs' id="registerdivright">
                    <div id="rdrtext">

                        <span id="rdrhead">Welcome to <span id="rdrheadlogo">GUFTAGU</span></span>
                        <span id="rdrinfo">PLEASE ENTER YOUR DETAILS TO REGISTER.</span>

                    </div>
                    <div id="rdrform">

                        <form id="rdrform" method='POST'>

                            <section className='rdrforminpgroup'>
                                <label htmlFor='name'>
                                    <i className="rdrformicon zmdi zmdi-account material-icons-name"></i>
                                </label>
                                <input className="rdrforminp" type="text" name='name' id='name' value={user.name} onChange={handleInputs} placeholder='Your Name' required></input>
                            </section>

                            <section className='rdrforminpgroup'>
                                <label htmlFor='age'>
                                    <i className="rdrformicon zmdi zmdi-account-calendar"></i>
                                </label>
                                <input className="rdrforminp" type="number" name='age' id='age' value={user.age} onChange={handleInputs} placeholder='Your Age' required></input>
                            </section>

                            <section className='rdrforminpgroup'>
                                <label htmlFor='email'>
                                    <i className="rdrformicon zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input className="rdrforminp" type="email" name='email' id='email' value={user.email} onChange={handleInputs} placeholder='Your Email' required></input>
                            </section>

                            <section className='rdrforminpgroup'>
                                <label htmlFor='password'>
                                    <i className="rdrformicon zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input className="rdrforminp" type="password" name='password' id='password' value={user.password} onChange={handleInputs} placeholder='Your Password' required></input>
                            </section>

                            <section className='rdrforminpgroup'>
                                <label htmlFor='cpassword'>
                                    <i className="rdrformicon zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input className="rdrforminp" type="password" name='cpassword' id='cpassword' value={user.cpassword} onChange={handleInputs} placeholder='Confirm Your Password' required></input>
                            </section>

                            <input type="submit" name='signup' id='signup' onClick={PostData} className="rdrformbt" value="Register"></input>

                            <Link id="rdrlink" to='/login'>Already a member?</Link>

                        </form>

                    </div>
                </div>

            </div>

            <ToastContainer />
        </>
    )
}

export default Register