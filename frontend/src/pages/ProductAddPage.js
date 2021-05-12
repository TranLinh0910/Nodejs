import ProductApi from "../api/ProductApi"
import { $ } from "../utils.js";
import firebase from '../firebase'
import categoryApi from "../api/categoryApi";

const ProductAddPage = {
 async render() {
    const {data: categories} = await categoryApi.getAll()
    return /*html */`
        <div class="container">
        <h2 class="text-center text-primary mt-5">Thêm Sản Phẩm</h2>
          <form id="form-add"  >
            <div class="form-group " style=" width:50%; margin:auto;margin-top:20px; ">
                <input type="text mt-2" placeholder="Tên sản phẩm" id="product-name" class="form-control">
            </div>
            <div class="form-group" style=" width:50%; margin:auto; margin-top:20px;">
                <input type="number"  placeholder="Giá" id="product-price" class="form-control">
            </div>
            <div class="form-group" style=" width:50%; margin:auto; margin-top:20px;">
                <input type="number"  placeholder="Số lượng" id="product-quantity" class="form-control">
            </div>
            <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; boeder:  1px solid #00000;">
                <input type="file"  id="product-image" class="form-control">
            </div>
            
            <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; boeder:  1px solid #00000;">
                <select name="" id="product-cateid">
                ${categories.map((category) => {
                  return `<option value="${category._id}">${category.name}</option>`;
                })}
                </select>
            </div>
            <div class="form-group"  style=" width:50%; margin:auto;margin-top:20px; margin-bottom:40px; ">

            <input type="submit" class="btn btn-primary" value="Add product">
          </div>
          </form>
        </div>
       
        
        `
  },
  afterRender() {
    $("#form-add").addEventListener("submit", (e) => {
      e.preventDefault();
      // check input 
      if ($('#product-name').value == "" || $('#product-price').value == "" || $('#product-image').value == "") {
        alert("Vui lòng nhập vào ô trống");
        return false
      }
      const productImage = $("#product-image").files[0];
      let storageRef = firebase.storage().ref(`images/${productImage.name}`);
      storageRef.put(productImage).then(function () {
        storageRef.getDownloadURL().then((url) => {
          const product = {
            // id: Math.random().toString(36).substr(2, 9),
            name: $("#product-name").value,
            image: url,
            price: $("#product-price").value,
            quantity: $("#product-quantity").value,
            category: $("#product-cateid").value
          };
          alert("Thêm sản phẩm thành công!!");
          ProductApi.add(product);
          window.location.hash = "/listproduct";
        });
      });
    });
  },
};
export default ProductAddPage;