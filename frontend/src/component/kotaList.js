import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const KotaList = () => {
    const [kota, setKota] = useState([]);
 
    useEffect(() => {
        getKota();
    }, []);
 
    const getKota = async () => {
        const response = await axios.get('http://localhost:5000/kota');
        setKota(response.data);
    }
 
    const deleteKota = async (id_kota) => {
        await axios.delete(`http://localhost:5000/kota/${id_kota}`);
        getKota();
    }
 
    return (
        <div>
            <Link to="/add" className="button is-primary mt-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Kota</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { kota.map((kota, index) => (
                        <tr key={ kota.id_kota }>
                            <td>{ index + 1 }</td>
                            <td>{ kota.nama_kota }</td>
                            <td>
                                <Link to={`/edit/${kota.id_kota}`} className="button is-small is-info">Edit</Link>
                                <button onClick={ () => deleteKota(kota.id_kota) } className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default KotaList