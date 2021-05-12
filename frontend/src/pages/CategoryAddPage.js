import { $ } from "../utils.js";
import firebase from '../firebase'
import categoryApi from "../api/categoryApi";

const categoryAddPage = {
    async render() {
        return /*html */`
        <div class="container">
        <h2 class="text-center text-primary mt-5">Thêm Sản Phẩm</h2>
          <form id="form-add"  >
            <div class="form-group " style=" width:50%; margin:auto;margin-top:20px; ">
                <input type="text mt-2" placeholder="Tên sản phẩm" id="category-name" class="form-control">
            </div>
            <div class="form-group" style=" width:50%; margin:auto;margin-top:20px; boeder:  1px solid #00000;">
                <input type="file"  id="category-image" class="form-control">
            </div>
            <div class="form-group"  style=" width:50%; margin:auto;margin-top:20px; margin-bottom:40px; ">
            <input type="submit" class="btn btn-primary" value="Thêm danh mục">
          </div>
          </form>
        </div>
       
        
        `
    },
    afterRender() {
        $("#form-add").addEventListener("submit", (e) => {
            e.preventDefault();
            // check input 
            if ($('#category-name').value == "" || $('#category-image').value == "") {
                alert("Vui lòng nhập vào ô trống");
                return false
            }
            const categoryImage = $("#category-image").files[0];
            let storageRef = firebase.storage().ref(`images/${categoryImage.name}`);
            storageRef.put(categoryImage).then(function () {
                storageRef.getDownloadURL().then((url) => {
                    const category = {
                        // id: Math.random().toString(36).substr(2, 9),
                        name: $("#category-name").value,
                        photo: url,
                    };
                    alert("Thêm sản phẩm thành công!!");
                    categoryApi.add(category);
                    window.location.hash = "/listcategory";
                });
            });
        });
    },
};
export default categoryAddPage;