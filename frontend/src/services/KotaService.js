import axios from 'axios';

const KOTA_API_BASE_URL = "http://localhost:5000/kota";

class KotaService {

    getKota(){
        return axios.get(KOTA_API_BASE_URL);
    }

    createKota(kota){
        return axios.post(KOTA_API_BASE_URL, kota);
    }

    getKotaById(id_kota){
        return axios.get(KOTA_API_BASE_URL + '/' + id_kota);
    }

    updateKota(kota, id_kota){
        return axios.put(KOTA_API_BASE_URL + '/' + id_kota, kota);
    }

    deleteKota(id_kota){
        return axios.delete(KOTA_API_BASE_URL + '/' + id_kota);
    }
}

export default new KotaService()

