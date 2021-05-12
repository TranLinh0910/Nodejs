import { axiosClient } from './axiosClient';
const productsApi = {
    getAll(){
        const url = `/product`;
        return axiosClient.get(url);
    },
    get(id){
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
    
    getAllNews(){
        const url = `/news`;
        return axiosClient.get(url);
    },
    add(products){
        const url = `/product`;
        return axiosClient.post(url, products);
    },
    remove(id){
        const url = `/product/${id}`;
        return axiosClient.delete(url);

    },
    update(id,data){
        const url = `/product/${id}`;
        return axiosClient.put(url,data);
    },
    search(inp) {
        const url = `/product?q=${inp}`;
        return axiosClient.get(url);
      },
    getAccount(username,password){
        const url = `/account?username=${username}&password=${password}`;
        return axiosClient.get(url);
    }
}
export default productsApi;