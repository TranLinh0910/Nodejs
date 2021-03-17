import {parseRequestUrl} from "../utils";
import data from '../data.js' 
import ProductApi from "../api/ProductApi";
import categoryApi from "../api/categoryApi";
const CategoryPage = {
   async render(){
       const {id}= parseRequestUrl();
       console.log(id);
       const { data :products}=await ProductApi.getAll();
       const {data: categories} = await categoryApi.getAll();
      const  result=products.filter(product=> product.categoryId ==id).map(product=>{
           return`<div class="col-4 mb-4">
           <div class="card">
        <img class="card-img" style="object-fit: cover;" height="400px" src="${product.image}" alt="${product.name}">
           <div class="card-body">
           <h5 class="card-title">${product.name}</h5>
           <p> ${product.price}</p>
               <a href="/#/products/${product.id}" class="btn btn-primary">Xem thêm</a>
        </div>
       </div>
       </div>`
       }).join("");
       return `
        <div class="container mt-4">
        <h1>${categories.filter(category => category.id == id).map(category => {
            return `${category.name}`
        })}</h1>
        <div class="row">
        ${result}
        </div></div>`;
    
    }
}
export default CategoryPage;