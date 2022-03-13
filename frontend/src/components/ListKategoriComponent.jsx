import React, { Component } from 'react'
import KategoriService from '../services/KategoriService'

class ListKategoriComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                kategori: []
        }
        this.addKategori = this.addKategori.bind(this);
        this.editKategori = this.editKategori.bind(this);
        this.deleteKategori = this.deleteKategori.bind(this);
    }

    deleteKategori(id_kategori){
        KategoriService.deleteKategori(id_kategori).then( res => {
            this.setState({kategori: this.state.kategori.filter(kategori => kategori.id_kategori !== id_kategori)});
        });
    }
    /*viewKategori(id_kategori){
        this.props.history.push(`/view-kategori/${id_kota}`);
    }*/
    editKategori(id_kategori){
        this.props.history.push(`/add-kategori/${id_kategori}`);
    }

    componentDidMount(){
        KategoriService.getKategori().then((res) => {
            this.setState({ kategori: res.data});
        });
    }

    addKategori(){
        this.props.history.push('/add-kategori/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">List KATEGORI</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addKategori}> Tambah Kategori</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ID Kategori</th>
                                    <th> Nama Kategori</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.kategori.map(
                                        kategori => 
                                        <tr key = {kategori.id_kategori}>
                                            <td> {kategori.id_kategori} </td>
                                             <td> {kategori.nama_kategori} </td>   
                                             <td>
                                                 <button onClick={ () => this.editKategori(kategori.id_kategori)} className="btn btn-info">Edit </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteKategori(kategori.id_kategori)} className="btn btn-danger">Hapus </button>
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

export default ListKategoriComponent

