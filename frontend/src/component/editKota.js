/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
 
const EditKota = () => {
    const [nama_kota, setNamaKota] = useState('');
    const { id_kota } = useParams();
    const navigate = useNavigate();
 
    const updateKota = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/kota/${id_kota}`,{
            nama_kota: nama_kota
        });
        navigate('/');
    }
 
    useEffect(() => {
        getKotaById();
    }, []);
 
    const getKotaById = async () => {
        const response = await axios.get(`http://localhost:5000/kota/${id_kota}`);
        setNamaKota(response.data.nama_kota);
    }
 
    return (
        <div>
            <form onSubmit={ updateKota }>
                <div className="field">
                    <label className="label">Nama Kota</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="T"
                        value={ nama_kota }
                        onChange={ (e) => setNamaKota(e.nama_kota.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Update</button>
                </div>
            </form>
        </div>
    )
}
 
export default EditKota