import React, { Component } from 'react'
import ProdukService from '../services/ProdukService';
import KategoriService from '../services/KategoriService';
import DistributorService from '../services/DistributorService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

class CreateProdukComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id_produk: this.props.match.params.id_produk,
            nama_produk: '',
            harga: '',
            id_kategori: '',
            id_distributor: '',
            kategori : [],
            distributor : []
        }
        this.changeNamaProdukHandler = this.changeNamaProdukHandler.bind(this);
        this.changeHargaHandler = this.changeHargaHandler.bind(this);
        this.changeIdKategoriHandler = this.changeIdKategoriHandler.bind(this);
        this.changeIdDistributorHandler = this.changeIdDistributorHandler.bind(this);
        this.saveOrUpdateProduk = this.saveOrUpdateProduk.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id_produk === '_add'){
            KategoriService.getKategori().then((res) => {
                this.setState({ kategori: res.data});
            });
            DistributorService.getDistributor().then((res) => {
                this.setState({ distributor: res.data});
            });
            return
        }else{
            KategoriService.getKategori().then((res) => {
                this.setState({ kategori: res.data});
            });
            DistributorService.getDistributor().then((res) => {
                this.setState({ distributor: res.data});
            });
            ProdukService.getProdukById(this.state.id_produk).then( (res) =>{
                let produk = res.data;
                this.setState({nama_produk: produk.nama_produk, harga : produk.harga, id_kategori : produk.id_kategori, id_distributor : produk.id_distributor});
            });
        }        
    }
    saveOrUpdateProduk = (e) => {
        e.preventDefault();
        let produk = {nama_produk: this.state.nama_produk,harga: this.state.harga, id_kategori: this.state.id_kategori, id_distributor: this.state.id_distributor};
        console.log('produk => ' + JSON.stringify(produk));

        // step 5
        if(this.state.id_produk === '_add'){
            ProdukService.createProduk(produk).then(res =>{
                this.props.history.push('/produk');
            });
        }else{
            ProdukService.updateProduk(produk, this.state.id_produk).then( res => {
                this.props.history.push('/produk');
            });
        }
    }
    
    changeNamaProdukHandler= (event) => {
        this.setState({nama_produk: event.target.value});
    }
    changeHargeHandler= (event) => {
        this.setState({harga: event.target.value});
    }
    changeHargaHandler= (event) => {
        this.setState({harga: event.target.value});
    }
    changeIdKategoriHandler= (event) => {
        this.setState({id_kategori: event.target.value});
    }
    changeIdDistributorHandler= (event) => {
        this.setState({id_distributor: event.target.value});
    }

    /*changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }*/

    cancel(){
        this.props.history.push('/produk');
    }

    getTitle(){
        if(this.state.id_produk === '_add'){
            return <h3 className="text-center">Tambah Produk</h3>
        }else{
            return <h3 className="text-center">Update Produk</h3>
        }
    }
    render() {
        return (
            <div>
                <HeaderComponent />
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nama Produk: </label>
                                            <input placeholder="nama produk" name="nama_produk" className="form-control" 
                                                value={this.state.nama_produk} onChange={this.changeNamaProdukHandler}/>
                                            <label> Harga: </label>
                                            <input type="number" placeholder="harga" name="harga" className="form-control" 
                                                value={this.state.harga} onChange={this.changeHargaHandler}/>
                                            <label> Kategori: </label>
                                            <select name="id_kategori" onChange={this.changeIdKategoriHandler}>
                                                {
                                                    this.state.kategori.map(
                                                        kategori => 
                                                        <option value={kategori.id_kategori}>{kategori.nama_kategori}</option>
                                                    )
                                                }
                                                    
                                            </select>
                                            {/*<input type="number" placeholder="id kategori" name="id_kategori" className="form-control" 
                                                value={this.state.id_kategori} onChange={this.changeIdKategoriHandler}/>}*/}
                                            <label> Distributor: </label>
                                            <select name="id_distributor" onChange={this.changeIdDistributorHandler}>
                                                {
                                                    this.state.distributor.map(
                                                        distributor => 
                                                        <option value={distributor.id_distributor}>{distributor.nama_distributor}</option>
                                                    )
                                                }
                                                    
                                            </select>
                                            {/*<input type="number" placeholder="id distributor" name="id_distributor" className="form-control" 
                            value={this.state.id_distributor} onChange={this.changeIdDistributorHandler}/>*/}
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateProduk}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
                   <FooterComponent />
            </div>
        )
    }
}

export default CreateProdukComponent

