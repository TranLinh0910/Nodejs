import ProductApi from "../api/ProductApi"
import { parseRequestUrl, $ } from "../utils";
import firebase from "../firebase"
const ProductEditPage={
async render(){
    const { id } = parseRequestUrl();
    const { data: product } = await ProductApi.get(id);
    console.log(product);
return/*html */`
<h2 class="text-center text-primary mt-5">Sửa Sản Phẩm</h2>
    <form id="form-update-product">
        <div class="form-group" style=" width:50%; margin:auto; margin-top:20px;">
        <label>Product name</label>
        <input type="text" class="form-control" id="product-name" value="${product.name}" placeholder="Tên sản phẩm">
        </div>
        <div class="form-group" style=" width:50%; margin:auto; margin-top:20px;">
        <label>Giá</label>
        <input type="text"  placeholder="Giá" id="product-price"  value="${product.price}" class="form-control">
        </div>
        <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; boeder:  1px solid #00000;">
        <input type="file"  id="product-image" class="form-control">
        <img src="${product.image}" alt="">
        </div>
        <div class="form-group"  style=" width:50%; margin:auto;margin-top:20px; margin-bottom:40px; ">
        <button type="submit" class="btn btn-primary">Update</button>
        </div>
    </form>
`
},
async afterRender(){
    const { id } = parseRequestUrl();
    const { data: product } = await ProductApi.get(id);
  
    $('#form-update-product').addEventListener('submit',(e)=>{
        e.preventDefault();
        const productImage = $("#product-image").files[0];
        let storageRef = firebase.storage().ref(`images/${productImage.name}`);
        storageRef.put(productImage).then(function () {
            storageRef.getDownloadURL().then((url) => {
        const newProduct={
            ...product,
            name: $('#product-name').value,
            price:$('#product-price').value,
            image: url,
        };
        ProductApi.update(id, newProduct);
        window.location.hash='/listproduct'
        });  
        });  
        })
        }

        };
export default ProductEditPage;