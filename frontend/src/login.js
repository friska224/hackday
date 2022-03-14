import { Link } from 'react-router-dom';
import React, { Component } from 'react';
//import HeaderComponent from './components/HeaderComponent';
//import FooterComponent from './components/FooterComponent';
import Home from './home';
import  { useEffect, useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";

function Login  () {
    let history = useHistory();
    const [usernameReg, setUernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState ("");
    
    const [username, setUername] = useState("");
    const [password, setPassword] = useState ("");
    
    const [loginStatus, setLoginStatus] = useState("");
    Axios.defaults.withCredentials = true;

 //const register = () => {
 // Axios.post("http://localhost:5000/register", {
 //   username: usernameReg,
 //   password: passwordReg,
 // }).then((response) => {
 //   console.log(response);
 //   });
 // };
 const login = () => {
    Axios.post("http://localhost:5000/login", {
       username: username,
       password: password,
    }).then((response) => {
        //return <Home/>
       if (response.data.loggedIn== false) {
          //setLoginStatus( response.data.message);
          //return  <Redirect  to="/home" />
          console.log("gagal");
          //return <Home/>
       } else {
        //return  <Redirect  to="/home" />
        //setLoginStatus (response.data[0].message);
        console.log("berhasil");
        
        history.push('/home')

       }
    });
    };
    useEffect(() => {
        Axios.get("http://localhost:5000/login").then((response) => {
          if (response.data.loggedIn == true) {
            setLoginStatus(response.data.user[0].role);
            history.push('/home')
          }
        });
      }, []);


    return(

    
    <div>
            {/*<div className="registration">
            <h1>Registration</h1>
            <label>Username</label>
            <input
               type="text"
               onChange={(e) => {
                  setUernameReg(e.target.value);
               }}
            /><br/>
            <label>password</label>
            <input 
              type="text"
              onChange={(e) =>{
                 setPasswordReg(e.target.value);
              }}
            /> <br />
            <button onClick={register} > Register</button>
            </div>   */}
         <div className="login">
             <h1>Login</h1>
             <input
                type="text"
                placeholder="Username…"
                onChange = { (e) => {
                   setUername (e.target.value);
                }}
                /> <br/>
             <input
                type="password"
                placeholder="Password…"
                onChange = { (e) => {
                   setPassword (e.target.value);
                }}
             />
             <button className="btn btn-success" onClick={login}>Login</button>
         </div>
         {/*<h1> {loginStatus}</h1>*/}
    </div>
);
}

export default Login;