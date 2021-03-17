import axios from 'axios'
import firebase from "../firebase";
import ProductApi from '../../frontend/src/api/ProductApi.js'
import { $ } from "../../frontend/src/utils";
const RegistrationPage = {
  render() {
    if (localStorage.getItem("username") != null) {
      alert("Bạn đang đăng nhập tài khoản , vui lòng đăng xuất để đăng kí tài khoản");
      window.location.hash ="/";
      return false;
    }
    return /*html*/ `
    <head>
    <title>Đăng kí</title>
    </head>
   
   
        <div class="container">
        <form class="row g-3 form-registration mb-3">
        <div class="text-center">
        <h1 class="sign-up-title text-white">SIGN UP</h1>
        </div>
        <div class='text-center '>
        <span class="err-signup text-danger"></span>
        </div>
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label text-white">Username</label>
    <input type="email" class="form-control" id="form-registration-username" placeholder="Your name">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label text-white">Password</label>
    <input type="password" class="form-control" id="form-registration-password" placeholder="Your password">
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label text-white">Email</label>
    <input type="text" class="form-control" id="form-registration-email" placeholder="your email">
  </div>
  <div class="col-6">
    <label for="inputAddress2" class="form-label text-white">Image</label>
    <input type="file" class="form-control" id="form-registration-image">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label text-white">NumberPhone</label>
    <input type="text" class="form-control" id="form-registration-numberphone" placeholder="Your number phone">
  </div>
  <div class="col-6">
  </div>
  <div class="col-3 mb-5">
    <button type="submit" id="btn-registration" class="btn btn-success w-100">Sign Up</button>
  </div>
  <div class="col-6 mb-5">
  </div>
</form>
        </div>
        `;
  },
  async afterRender() {
    $("#btn-registration").addEventListener("click", async function (e) {
      e.preventDefault();
      //start lấy dữ liệu form
      const username = $("#form-registration-username").value;
      const image = $("#form-registration-image").value;
      const password = $("#form-registration-password").value;
      const email = $("#form-registration-email");
      const numberphone = $("#form-registration-numberphone");
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //start check input trống
      if (
        username == "" ||
image == "" ||
        (password == "") | (email == "") ||
        numberphone == ""
      ) {
        $(".err-signup").innerHTML = "Vui lòng nhập thông tin tài khoản";
        return false;
      }
      //start check email 
    
      //start check number phone
     
      //start check tài khoản đã tồn tại hay chưa
    
        const usersImage = $("#form-registration-image").files[0];
        let storageRef = firebase.storage().ref(`users/${usersImage.name}`);
        storageRef.put(usersImage).then(function () {
          storageRef.getDownloadURL().then(async (url) => {
            const product = {
              id: "",
              username: $("#form-registration-username").value,
              image: url,
              password: $("#form-registration-password").value,
              email: $("#form-registration-email").value,
              numberphone: $("#form-registration-numberphone").value,
              role: 1,
            };
            const data_URL = "http://localhost:3000/account";
            const method_SEVER = {
              method: "POST",
              headers: { "content-type": "application/json" },
              data: JSON.stringify(product),
              url: data_URL,
            };
            axios(method_SEVER, product);
            $(".err-signup").innerHTML = "Đăng kí thành công";
          window.location.hash = "/login";
          });
        });
     
    });
  },
};

export default RegistrationPage;