import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const toggleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
