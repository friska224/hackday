import Axios from 'axios';
import { Redirect, useHistory } from "react-router-dom";
import React, { Component } from 'react';


function logout  (){
    //let history = useHistory();
    Axios.get("http://localhost:5000/logout");
    //history.push('/login');
    return <Redirect to={"/"}/>
};



export default logout;