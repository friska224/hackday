import React, { Component } from 'react'
import DistributorService from '../services/DistributorService';
import KotaService from '../services/KotaService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

class CreateDistributorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id_distributor: this.props.match.params.id_distributor,
            nama_distributor: '',
            alamat: '',
            id_kota: '',
            kota : []
        }
        this.changeNamaDistributorHandler = this.changeNamaDistributorHandler.bind(this);
        this.changeAlamatHandler = this.changeAlamatHandler.bind(this);
        this.changeIdKotaHandler = this.changeIdKotaHandler.bind(this);
        this.saveOrUpdateDistributor = this.saveOrUpdateDistributor.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id_distributor === '_add'){
            KotaService.getKota().then((res) => {
                this.setState({ kota: res.data});
            });
            return 
        }else{
            KotaService.getKota().then((res) => {
                this.setState({ kota: res.data});
            });
            DistributorService.getDistributorById(this.state.id_distributor).then( (res) =>{
                let distributor = res.data;
                this.setState({nama_distributor: distributor.nama_distributor,
                alamat : distributor.alamat,
                id_kota : distributor.id_kota
                });
            });
        } 
        
        
    }
    saveOrUpdateDistributor = (e) => {
        e.preventDefault();
        let distributor = {nama_distributor: this.state.nama_distributor,
            alamat: this.state.alamat,
            id_kota: this.state.id_kota,    
        };
        console.log('distributor => ' + JSON.stringify(distributor));

        // step 5
        if(this.state.id_distributor === '_add'){
            DistributorService.createDistributor(distributor).then(res =>{
                this.props.history.push('/distributor');
            });
        }else{
            DistributorService.updateDistributor(distributor, this.state.id_distributor).then( res => {
                this.props.history.push('/distributor');
            });
        }
    }
    
    changeNamaDistributorHandler= (event) => {
        this.setState({nama_distributor: event.target.value});
    }
    changeAlamatHandler= (event) => {
        this.setState({alamat: event.target.value});
    }
    changeIdKotaHandler= (event) => {
        this.setState({id_kota: event.target.value});
    }

    cancel(){
        this.props.history.push('/distributor');
    }

    getTitle(){
        if(this.state.id_distributor === '_add'){
            return <h3 className="text-center">Tambah Distributor</h3>
        }else{
            return <h3 className="text-center">Update Distributor</h3>
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
                                            <label> Nama Distributor: </label>
                                            <input placeholder="nama distributor" name="nama_distributor" className="form-control" 
                                                value={this.state.nama_distributor} onChange={this.changeNamaDistributorHandler}/>
                                            <label> Alamat: </label>
                                            <input placeholder="alamat" name="alamat" className="form-control" 
                                                value={this.state.alamat} onChange={this.changeAlamatHandler}/>
                                            <label> Kota: </label>
                                            <select name="id_kota" onChange={this.changeIdKotaHandler}>
                                                {
                                                    this.state.kota.map(
                                                        kota => 
                                                        <option value={kota.id_kota}>{kota.nama_kota}</option>
                                                    )
                                                }
                                                    
                                            </select>
                                            {/*<input placeholder="Id Kota" name="id_kota" className="form-control" 
                                                value={this.state.id_kota} onChange={this.changeIdKotaHandler}/>*/}
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateDistributor}>Save</button>
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

export default CreateDistributorComponent

