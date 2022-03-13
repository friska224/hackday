

import axios from 'axios';

const KATEGORI_API_BASE_URL = "http://localhost:5000/kategori";

class KategoriService {

    getKategori(){
        return axios.get(KATEGORI_API_BASE_URL);
    }

    createKategori(kategori){
        return axios.post(KATEGORI_API_BASE_URL, kategori);
    }

    getKategoriById(id_kategori){
        return axios.get(KATEGORI_API_BASE_URL + '/' + id_kategori);
    }

    updateKategori(kategori, id_kategori){
        return axios.put(KATEGORI_API_BASE_URL + '/' + id_kategori, kategori);
    }

    deleteKategori(id_kategori){
        return axios.delete(KATEGORI_API_BASE_URL + '/' + id_kategori);
    }
}

export default new KategoriService()

