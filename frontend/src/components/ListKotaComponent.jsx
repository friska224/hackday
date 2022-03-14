
import React, { Component } from 'react'
import KotaService from '../services/KotaService'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

class ListKotaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                kota: []
        }
        this.addKota = this.addKota.bind(this);
        this.editKota = this.editKota.bind(this);
        this.deleteKota = this.deleteKota.bind(this);
    }

    deleteKota(id_kota){
        KotaService.deleteKota(id_kota).then( res => {
            this.setState({kota: this.state.kota.filter(kota => kota.id_kota !== id_kota)});
        });
    }
    /*viewKota(id_kota){
        this.props.history.push(`/view-kota/${id_kota}`);
    }*/
    editKota(id_kota){
        this.props.history.push(`/add-kota/${id_kota}`);
    }

    componentDidMount(){
        KotaService.getKota().then((res) => {
            this.setState({ kota: res.data});
        });
    }

    addKota(){
        this.props.history.push('/add-kota/_add');
    }

    render() {
        return (
            <div>
                <HeaderComponent />
                 <h2 className="text-center">List KOTA</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addKota}> Tambah Kota</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ID KOTA</th>
                                    <th> Nama Kota</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.kota.map(
                                        kota => 
                                        <tr key = {kota.id_kota}>
                                            <td> {kota.id_kota} </td>
                                             <td> {kota.nama_kota} </td>   
                                             <td>
                                                 <button onClick={ () => this.editKota(kota.id_kota)} className="btn btn-info">Edit </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteKota(kota.id_kota)} className="btn btn-danger">Hapus </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
                 <FooterComponent />
            </div>
        )
    }
}

export default ListKotaComponent

