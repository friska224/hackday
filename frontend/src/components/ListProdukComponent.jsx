import React, { Component } from 'react'
import ProdukService from '../services/ProdukService'

class ListProdukComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                produk: []
        }
        this.addProduk = this.addProduk.bind(this);
        this.editProduk = this.editProduk.bind(this);
        this.deleteProduk = this.deleteProduk.bind(this);
    }

    deleteProduk(id_produk){
        ProdukService.deleteProduk(id_produk).then( res => {
            this.setState({produk: this.state.produk.filter(produk => produk.id_produk !== id_produk)});
        });
    }
    /*viewKota(id_kota){
        this.props.history.push(`/view-kota/${id_kota}`);
    }*/
    editProduk(id_produk){
        this.props.history.push(`/add-produk/${id_produk}`);
    }

    componentDidMount(){
        ProdukService.getProduk().then((res) => {
            this.setState({ produk: res.data});
        });
    }

    addProduk(){
        this.props.history.push('/add-produk/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">List PRODUK</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addProduk}> Tambah Produk</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ID Produk</th>
                                    <th> Nama Produk</th>
                                    <th> Harga Produk</th>
                                    <th> Kategori</th>
                                    <th> Distributor</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.produk.map(
                                        produk => 
                                        <tr key = {produk.id_produk}>
                                            <td> {produk.id_produk} </td>
                                             <td> {produk.nama_produk} </td>
                                             <td> {produk.harga} </td>
                                             <td> {produk.nama_kategori} </td>
                                             <td> {produk.nama_distributor} </td>  
                                             <td>
                                                 <button onClick={ () => this.editProduk(produk.id_produk)} className="btn btn-info">Edit </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProduk(produk.id_produk)} className="btn btn-danger">Hapus </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListProdukComponent

