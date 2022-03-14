
import React, { Component } from 'react'
import DistributorService from '../services/DistributorService'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

class ListDistributorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                distributor: []
        }
        this.addDistributor = this.addDistributor.bind(this);
        this.editDistributor = this.editDistributor.bind(this);
        this.deleteDistributor = this.deleteDistributor.bind(this);
    }

    deleteDistributor(id_distributor){
        DistributorService.deleteDistributor(id_distributor).then( res => {
            this.setState({distributor: this.state.distributor.filter(distributor => distributor.id_distributor !== id_distributor)});
        });
    }
    /*viewKota(id_kota){
        this.props.history.push(`/view-kota/${id_kota}`);
    }*/
    editDistributor(id_distributor){
        this.props.history.push(`/add-distributor/${id_distributor}`);
    }

    componentDidMount(){
        DistributorService.getDistributor().then((res) => {
            this.setState({ distributor: res.data});
        });
    }

    addDistributor(){
        this.props.history.push('/add-distributor/_add');
    }

    render() {
        return (
            <div>
                <HeaderComponent />
                 <h2 className="text-center">List Distributor</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addDistributor}> Tambah Distributor</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ID Distributor</th>
                                    <th> Nama Distributor</th>
                                    <th> Alamat</th>
                                    <th> Kota</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.distributor.map(
                                        distributor => 
                                        <tr key = {distributor.id_distributor}>
                                            <td> {distributor.id_distributor} </td>
                                             <td> {distributor.nama_distributor} </td>
                                             <td> {distributor.alamat} </td>
                                             <td> {distributor.nama_kota} </td>   
                                             <td>
                                                 <button onClick={ () => this.editDistributor(distributor.id_distributor)} className="btn btn-info">Edit </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDistributor(distributor.id_distributor)} className="btn btn-danger">Hapus </button>
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

export default ListDistributorComponent

