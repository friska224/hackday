import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';


const Home = () => {
    
    
    
    return(
    <div>
<HeaderComponent />
    <ul>
        
        <li>
            <Link to={`/kota`}>Kota</Link>
        </li>
        <li>
            <Link to={`/kategori`}>Kategori</Link>
        </li>
        <li>
            <Link to={`/distributor`}>Distributor</Link>
        </li>
        <li>
            <Link to={`/produk`}>Produk</Link>
        </li>
    </ul>
    <FooterComponent />
    </div>
);
}

export default Home;