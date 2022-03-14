import React, { Component } from 'react'
import KategoriService from '../services/KategoriService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

class CreateKategoriComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id_kategori: this.props.match.params.id_kategori,
            nama_kategori: ''
        }
        this.changeNamaKategoriHandler = this.changeNamaKategoriHandler.bind(this);
        this.saveOrUpdateKategori = this.saveOrUpdateKategori.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id_kategori === '_add'){
            return
        }else{
            KategoriService.getKategoriById(this.state.id_kategori).then( (res) =>{
                let kategori = res.data;
                this.setState({nama_kategori: kategori.nama_kategori});
            });
        }        
    }
    saveOrUpdateKategori = (e) => {
        e.preventDefault();
        let kategori = {nama_kategori: this.state.nama_kategori};
        console.log('kategori => ' + JSON.stringify(kategori));

        // step 5
        if(this.state.id_kategori === '_add'){
            KategoriService.createKategori(kategori).then(res =>{
                this.props.history.push('/kategori');
            });
        }else{
            KategoriService.updateKategori(kategori, this.state.id_kategori).then( res => {
                this.props.history.push('/kategori');
            });
        }
    }
    
    changeNamaKategoriHandler= (event) => {
        this.setState({nama_kategori: event.target.value});
    }

    /*changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }*/

    cancel(){
        this.props.history.push('/kategori');
    }

    getTitle(){
        if(this.state.id_kategori === '_add'){
            return <h3 className="text-center">Tambah Kategori</h3>
        }else{
            return <h3 className="text-center">Update Kategori</h3>
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
                                            <label> Nama Kategori: </label>
                                            <input placeholder="nama kategori" name="nama_kategori" className="form-control" 
                                                value={this.state.nama_kategori} onChange={this.changeNamaKategoriHandler}/>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateKategori}>Save</button>
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

export default CreateKategoriComponent

