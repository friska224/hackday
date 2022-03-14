

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand">Produk Managemen | </div>
                    <div className="navbar" className="px-2"><Link to={`/kota`} class="text-warning">Kota</Link></div>
                    <div className="navbar" className="px-2"><Link to={`/kategori`} class="text-warning">Kategori</Link></div>
                    <div className="navbar" className="px-2"><Link to={`/distributor`} class="text-warning">Distributor</Link></div>
                    <div className="navbar" className="px-2"><Link to={`/produk`} class="text-warning">Produk</Link></div>
                    <div className="navbar" className="px-2"><Link to={`../logout`} class="text-warning">Logout</Link></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent

