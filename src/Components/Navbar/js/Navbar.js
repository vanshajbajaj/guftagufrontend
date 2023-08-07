import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../css/Navbar.css";
import { Link } from 'react-router-dom';
// import logo from "./../assets/png/logo-no-background.png";
import { AuthContext } from '../../../Context/AuthContext';

const Navbar = () => {

    const { isLoggedIn, toggleIsLoggedIn } = useContext(AuthContext);
    // console.log(isloggedin);

    const testtt = () => {
        console.log(isLoggedIn);
    }

    const navigate = useNavigate();

    function handleLogout() {
        fetch('/api/logout', { method: 'POST' })
            .then(res => {
                if (res.ok) {
                    toggleIsLoggedIn();
                    localStorage.removeItem('isLoggedIn');
                    navigate('/');
                } else {
                    throw new Error('Failed to logout');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>

            <div id="nbdiv">

                <div id="nbimgdiv">
                    <div class="waviy">
                        <span style={{"--i":"1"}}>गु</span>
                        <span style={{"--i":"2"}}>फ्त</span>
                        <span style={{"--i":"3"}}>गू</span>
                        {/* <span style={{"--i":"4"}}>T</span>
                        <span style={{"--i":"5"}}>A</span>
                        <span style={{"--i":"6"}}>G</span>
                        <span style={{"--i":"7"}}>U</span> */}
                        {/* गुफ्तगू */}
                    </div>
                </div>
                <div id="nblinksdiv">
                    <div className="nblink">
                        <Link to="/">HOME</Link>
                    </div>
                    <div className="nblink">
                        <Link to="/profile">MY PROFILE</Link>
                    </div>
                    {/* <div className="nblink">
                        <Link to="/login">LOGIN</Link>
                    </div>
                    <div className="nblink">
                        <Link to="/register">REGISTER</Link>
                    </div> */}
                    {isLoggedIn ? (
                        <div className="nblink">
                            <Link to="/logout" onClick={handleLogout}>LOGOUT</Link>
                        </div>
                    ) : (
                        <>
                            <div className="nblink">
                                <Link to="/login">LOGIN</Link>
                            </div>
                            <div className="nblink">
                                <Link to="/register">REGISTER</Link>
                            </div>
                        </>
                    )}
                    {/* <div>
                        <button onClick={testtt}>PRESS</button>
                    </div> */}
                </div>

            </div>

        </>
    )
}

export default Navbar