import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListKotaComponent from './components/ListKotaComponent';
import CreateKotaComponent from './components/CreateKotaComponent';
import ListKategoriComponent from './components/ListKategoriComponent';
import CreateKategoriComponent from './components/CreateKategoriComponent';
import ListDistributorComponent from './components/ListDistributorComponent';
import CreateDistributorComponent from './components/CreateDistributorComponent';
import ListProdukComponent from './components/ListProdukComponent';
import CreateProdukComponent from './components/CreateProdukComponent';
import Home from './home';


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {Home}></Route>
                          <Route path = "/kota" exact component = {ListKotaComponent}></Route>
                          <Route path = "/add-kota/:id_kota" component = {CreateKotaComponent}></Route>
                          <Route path = "/kategori" exact component = {ListKategoriComponent}></Route>
                          <Route path = "/add-kategori/:id_kategori" component = {CreateKategoriComponent}></Route>
                          <Route path = "/distributor" exact component = {ListDistributorComponent}></Route>
                          <Route path = "/add-distributor/:id_distributor" component = {CreateDistributorComponent}></Route>
                          <Route path = "/produk" exact component = {ListProdukComponent}></Route>
                          <Route path = "/add-produk/:id_produk" component = {CreateProdukComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
  )
}

export default App;
