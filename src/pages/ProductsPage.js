//import data from'../data.js';
import ProductApi from '../api/ProductApi.js';
// import axios from 'axios';
const ProductsPage = {
    async render() {
        try {
            const { data: products } = await ProductApi.getAll();

            // const response=await axios ('https://5e79b4b817314d00161333da.mockapi.io/products');
            // const products =await response.data;
            const result = products.map(product => {
                return ` 
       
                <div class="col-4">
            <div class="card mt-3 mb-3">
         <img class="card-img " style="object-fit: cover;" height="400px" src="${product.image}" alt="${product.name}">
            <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p> ${product.price}</p>
                <a href="/#/products/${product._id}" class="btn btn-primary">Xem thêm</a>
         </div>
        </div>
        </div>`;
            }).join("");

            return `
        <div class="container">
        <section>
        <div class="d-flex flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight"></div>
            <div class="p-2 bd-highlight">
                <a href="" style="text-decoration: none; color: black;"> Trang Chủ  / </a></div>
            <div class="p-2 bd-highlight">
                <a href="" style="text-decoration: none; color: black;"> Sản Phẩm</a></div>
        </div>
    </section> 
        <div class="row">
        ${result}
        </div></div>`;

        } catch (error) {
            console.log(error);
        }
        // const {products}=data;



    },
};
export default ProductsPage;