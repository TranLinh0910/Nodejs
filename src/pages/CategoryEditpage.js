
// import ProductAPI from "../api/productApi";
import { parseRequestUrl, $ } from "../utils.js";
// import CategoryAPI from "../api/categoryApi";
import firebase from "../firebase";
import categoryApi from "../api/categoryApi";
const CategoryEditpage = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: category } = await categoryApi.get(id);
    return /*html*/ `<div class= "container">
    <form id="form-update" class="w-1/2 mx-auto mb-4" action="">
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <input type="hidden" value="${category._id}" name="" id="update-id">
    </div>
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <label for="">Tên sản phẩm</label>
    <input class="form-control" type="text" value="${
        category.name
    }"  name="" id="update-name">
    </div>
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <label for="">Ảnh sản phẩm</label>
    <input class="form-control" type="file" value=""  name="" id="update-image">
    <input type="hidden" name="" id="update-hidden-url" value="${
        category.photo
    }">
    <img src="${category.photo}" alt="">
    </div>
   
   
   
    
    <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; ">
    <button type="submit" class="btn btn-danger btn-block">Update</button>
    </div>
    </form>
    </div>`;
  },
  async afterRender() {
    const { id } = parseRequestUrl();
    $("#form-update").addEventListener("submit", (e) => {
      e.preventDefault();
      if ($("#update-image").value == "") {
        const data = {
          _id: $("#update-id").value,
          name: $("#update-name").value,
          photo: $("#update-hidden-url").value,
        //   price: $("#update-price").value,
          // sale: $("#update-sale").value,
        //   category: $("#update-cateid").value,
        //   description: $("update-description").value,
        };
        alert("Update thành công!!!");
        categoryApi.update(id, data);

        window.location.hash = "/ListCategory";
      } else {
        const categoryImage = $("#update-image").files[0];
        let storageRef = firebase.storage().ref(`images/${categoryImage.name}`);
        storageRef.put(categoryImage).then(function () {
          storageRef.getDownloadURL().then((url) => {
            const data = {
              _id: $("#update-id").value,
              name: $("#update-name").value,
              photo: url,
              // sale: $("#update-sale").value,
            //   category: $("#update-cateid").value,
            //   description: $("update-description").value,
            };
            alert("Update thành công!!!");
            categoryApi.update(id, data);
            window.location.hash = "/ListCategory";
          });
        });
      }
    });
  },
};
export default CategoryEditpage;
