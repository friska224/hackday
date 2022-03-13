import axios from 'axios';

const PRODUK_API_BASE_URL = "http://localhost:5000/produk";

class ProdukService {

    getProduk(){
        return axios.get(PRODUK_API_BASE_URL);
    }

    createProduk(produk){
        return axios.post(PRODUK_API_BASE_URL, produk);
    }

    getProdukById(id_produk){
        return axios.get(PRODUK_API_BASE_URL + '/' + id_produk);
    }

    updateProduk(produk, id_produk){
        return axios.put(PRODUK_API_BASE_URL + '/' + id_produk, produk);
    }

    deleteProduk(id_produk){
        return axios.delete(PRODUK_API_BASE_URL + '/' + id_produk);
    }
}

export default new ProdukService()

