import { axiosClient } from './axiosClient';
const categoryApi = {
    getAll(){
        const url = `/categories`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    add(){

    },
    remove(id){

    },
    updeta(id){

    },
}
export default categoryApi;