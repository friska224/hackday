import { Link } from 'react-router-dom';
import React, { Component } from 'react';


const Home = () => {return(
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
);
}

export default Home;