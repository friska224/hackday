import axios from 'axios';

const DISTRIBUTOR_API_BASE_URL = "http://localhost:5000/distributor";

class DistributorService {

    getDistributor(){
        return axios.get(DISTRIBUTOR_API_BASE_URL);
    }

    createDistributor(distributor){
        return axios.post(DISTRIBUTOR_API_BASE_URL, distributor);
    }

    getDistributorById(id_distributor){
        return axios.get(DISTRIBUTOR_API_BASE_URL + '/' + id_distributor);
    }

    updateDistributor(distributor, id_distributor){
        return axios.put(DISTRIBUTOR_API_BASE_URL + '/' + id_distributor, distributor);
    }

    deleteDistributor(id_distributor){
        return axios.delete(DISTRIBUTOR_API_BASE_URL + '/' + id_distributor);
    }
}

export default new DistributorService()

