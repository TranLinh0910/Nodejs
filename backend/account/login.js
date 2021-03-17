import ProductApi from "../../frontend/src/api/ProductApi";
import { $ } from "../../frontend/src/utils";

const Login = {
   async render() {

         return ` <div class="container-fluid">
         <div id="err-login"></div>
        <form>
          <div class="row">
            <h2 style="text-align:center">Đăng Nhập Yame Shop </h2>
            <div class="col">
              <a href="#" class="fb btn">
                <i class="fa fa-facebook fa-fw"></i> Đăng Nhập Với Facebook
               </a>
              <a href="#" class="twitter btn">
                <i class="fa fa-twitter fa-fw"></i> Đăng Nhập Với Twitter
              </a>
              <a href="#" class="google btn"><i class="fa fa-google fa-fw">
                </i> Đăng Nhập Với Google+
              </a>
            </div>
      
            <div class="col">
      
              <input type="text" name="user-name" id="login-username" placeholder="Tài Khoản" required>
              <input type="password" name="pass-word" id="login-password" placeholder="Mật Khẩu" required>
              <input type="submit" id="btn-login" value="Login">
            </div>
            
          </div>
        </form>
      </div>
           
      <div class="bottom-container">
        <div class="row">
          <div class="col">
            <a href="/#/registration" style="color:white" class="button">Đăng Kí </a>
          </div>
          <div class="col">
            <a href="#" style="color:white" class="button">Quên mật khẩu?</a>
          </div>
        </div>
      </div>
      `
    },
    async afterRender(){
        $('#btn-login').addEventListener('click',async (e)=>{
            e.preventDefault();
            const username = $('#login-username').value
            const password = $('#login-password').value
            const {data : account} = await ProductApi.getAccount(username,password);
            console.log(account);
           if(account.length === 0){
             $("err-login").innerHTML = "Thông tin tài khoản không chính xác!!!";
           }else{
             account.map(({username, password}) => {
localStorage.setItem("username", username);
localStorage.setItem("password", password);
window.location.hash = "/";
             })
           }
        })
    }
}
export default Login;
