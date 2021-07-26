import ProductAPI from "../api/productApi";
import { parseRequestUrl, $ } from "../utils.js";
import CategoryAPI from "../api/categoryApi";
import firebase from "../firebase";
const ProductEditPage = {
  async render() {
    //lấy id của parse là tham số truyền vào
    const { id } = parseRequestUrl();

    const { data: product } = await ProductAPI.get(id);
    const { data: categories } = await CategoryAPI.getAll();
    return /*html*/ `<div class = "container">

    <form id="form-update" class="w-1/2 mx-auto mb-4" action="">
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <input type="hidden" value="${product._id}" name="" id="update-id">
    </div>
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <label for="">Tên sản phẩm</label>
    <input class="form-control" type="text" value="${
      product.name
    }"  name="" id="update-name">
    </div>
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <label for="">Ảnh sản phẩm</label>
    <input class="form-control" type="file" value=""  name="" id="update-image">
    <input type="hidden" name="" id="update-hidden-url" value="${
      product.image
    }">
    <img src="${product.image}" alt="">
    </div>
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <label for="">Giá sản phẩm</label>
    <input class="form-control" type="number" value="${
      product.price
    }"  name="" id="update-price">
    </div>
   
   
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <label for="">Danh mục sản phẩm</label>
    <select class="border-2 border-gray-200 p-2" name="" id="update-cateid">
    ${categories.map((category) => {
      return `<option value="${category._id}">${category.name}</option>`;
    })}
    </select>
    </div>
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <button type="submit" class="btn btn-danger btn-block">Update</button>
    </div>
    </form>
    </div>`;
  },
  async afterRender() {
    const { id } = parseRequestUrl();
    // lấy dữ liệu trên form để gắn cho nó một sự kiện
    $("#form-update").addEventListener("submit", (e) => {
      e.preventDefault();
      // chặn sự kiện 
      if ($("#update-image").value == "") {
        const data = {
          _id: $("#update-id").value,
          name: $("#update-name").value,
          image: $("#update-hidden-url").value,
          price: $("#update-price").value,
          // sale: $("#update-sale").value,
          category: $("#update-cateid").value,
        //   description: $("update-description").value,
        };
        alert("Update thành công!!!");
        ProductAPI.update(id, data);

        window.location.hash = "/listproduct";
      } else {
        const productImage = $("#update-image").files[0];
        let storageRef = firebase.storage().ref(`images/${productImage.name}`);
        //để sửa tên ảnh r đẩy lên firebase
        storageRef.put(productImage).then(function () {
          storageRef.getDownloadURL().then((url) => {
            const data = {
              // là để lưu dữ liệu r gửi dữ liệu lên api
              _id: $("#update-id").value,
              name: $("#update-name").value,
              image: url,
              price: $("#update-price").value,
              // sale: $("#update-sale").value,
              category: $("#update-cateid").value,
            //   description: $("update-description").value,
            };
            alert("Update thành công!!!");
            ProductAPI.update(id, data);
            //dòng 89 có cái id là lấy id của sản phẩm để sửa sp
            window.location.hash = "/listproduct";
          });
        });
      }
    });
  },
};
export default ProductEditPage;
