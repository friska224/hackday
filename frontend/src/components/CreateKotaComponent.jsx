import React, { Component } from 'react'
import KotaService from '../services/KotaService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

class CreateKotaComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id_kota: this.props.match.params.id_kota,
            nama_kota: ''
        }
        this.changeNamaKotaHandler = this.changeNamaKotaHandler.bind(this);
        this.saveOrUpdateKota = this.saveOrUpdateKota.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id_kota === '_add'){
            return
        }else{
            KotaService.getKotaById(this.state.id_kota).then( (res) =>{
                let kota = res.data;
                this.setState({nama_kota: kota.nama_kota});
            });
        }        
    }
    saveOrUpdateKota = (e) => {
        e.preventDefault();
        let kota = {nama_kota: this.state.nama_kota};
        console.log('kota => ' + JSON.stringify(kota));

        // step 5
        if(this.state.id_kota === '_add'){
            KotaService.createKota(kota).then(res =>{
                this.props.history.push('/kota');
            });
        }else{
            KotaService.updateKota(kota, this.state.id_kota).then( res => {
                this.props.history.push('/kota');
            });
        }
    }
    
    changeNamaKotaHandler= (event) => {
        this.setState({nama_kota: event.target.value});
    }

    /*changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }*/

    cancel(){
        this.props.history.push('/kota');
    }

    getTitle(){
        if(this.state.id_kota === '_add'){
            return <h3 className="text-center">Tambah Kota</h3>
        }else{
            return <h3 className="text-center">Update Kota</h3>
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
                                            <label> Nama Kota: </label>
                                            <input placeholder="nama kota" name="nama_kota" className="form-control" 
                                                value={this.state.nama_kota} onChange={this.changeNamaKotaHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateKota}>Save</button>
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

export default CreateKotaComponent

