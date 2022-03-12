import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 
const AddKota = () => {
    const [id_kota, setIdKota] = useState('');
    const [nama_kota, setNamaKota] = useState('');
    const navigate = useNavigate();
 
    const saveKota = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/kota',{
            id_kota: id_kota,
            nama_kota: nama_kota
        });
        navigate('/');
    }
 
    return (
        <div>
            <form onSubmit={ saveKota }>
                <div className="field">
                    <label className="label">ID Kota</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Id Kota"
                        value={ id_kota }
                        onChange={ (e) => setIdKota(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Nama Kota</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Nama Kota"
                        value={ nama_kota }
                        onChange={ (e) => setNamaKota(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddKota