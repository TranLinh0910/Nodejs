import HomePage from "./pages/Homepage.js";
import ProductsPage from './pages/ProductsPage.js';
import ProductDetail from './pages/ProductDetail.js'
import { parseRequestUrl,$ } from "./utils.js";
import Error404Page from "./pages/Error404Page.js";
import Header from "./components/Header.js";
import Category from "./pages/CategoryPage.js";
import ProductAddPage from "./pages/ProductAddPage.js";
import AdminProductPage from './pages/AdminProductPage.js';
import ProductEditPage from "./pages/ProductEditPage.js";
import About from "./pages/About.js";
import News from "./pages/News.js";
import Login from "../../backend/account/login.js";
import RegistrationPage from "../../backend/account/RegistrationPage.js";

const routes={
    '/': HomePage,
    '/products':ProductsPage,
    '/products/:id':ProductDetail,
    '/category/:id':Category,
    '/addproduct': ProductAddPage,
    '/listproduct':AdminProductPage,
    '/editproduct/:id':ProductEditPage,
    '/about':About,
    '/login':Login,
    '/new':News,
    '/registration' : RegistrationPage,

}
const router = async ()=>{
    const {resource,id}=parseRequestUrl();
    const parseUrl=(resource ? `/${resource}` :"/")+(id ? `/:id`:"");
    const page=routes[parseUrl]? routes[parseUrl]: Error404Page;
    $('#header').innerHTML= await Header.render();
    $('#main-content').innerHTML= await page.render();
    if (page.afterRender()) {
        await page.afterRender();
      }
    
}
window.addEventListener('DOMContentLoaded',router);
window.addEventListener("hashchange",router);


