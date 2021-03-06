// import categoryApi from '../api/categoryApi';
import ProductApi from '../api/ProductApi';
import {$} from '../utils';

const Header ={
 async render(){
    // const {data: categories }= await categoryApi.getAll();
    //console.log(data);
    return/*html*/`
    
        
         <!-- Start Top Nav -->
    <nav class="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
    <div class="container text-light">
        <div class="w-100 d-flex justify-content-between">
            <div>
                <i class="fa fa-envelope mx-2"></i>
                <a class="navbar-sm-brand text-light text-decoration-none"
                    href="mailto:info@company.com">info@company.com</a>
                <i class="fa fa-phone mx-2"></i>
                <a class="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">010-020-0340</a>
            </div>
            <div>
                <a class="text-light" href="https://fb.com/templatemo" target="_blank" rel="sponsored"><i
                        class="fab fa-facebook-f fa-sm fa-fw me-2"></i></a>
                <a class="text-light" href="https://www.instagram.com/" target="_blank"><i
                        class="fab fa-instagram fa-sm fa-fw me-2"></i></a>
                <a class="text-light" href="https://twitter.com/" target="_blank"><i
                        class="fab fa-twitter fa-sm fa-fw me-2"></i></a>
                <a class="text-light" href="https://www.linkedin.com/" target="_blank"><i
                        class="fab fa-linkedin fa-sm fa-fw"></i></a>
            </div>
        </div>
    </div>
</nav>
<!-- Close Top Nav -->


<!-- Header -->

<nav class="navbar navbar-expand-lg navbar-light shadow">
    <div class="container d-flex justify-content-between align-items-center">

        <img src="https://res.yame.vn/Content/images/yame-f-logo-white.png" alt="">

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav">
            <div class="flex-fill">
                <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#/about">About</a>
                    </li>
                    <li class="nav-item" id="nav-products">
                        <a class="nav-link" href="/#/products">S???n ph???m</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#/new">News</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/#/listproduct">Qu???n tr???</a>
                </li>
                    
                </ul>
            </div>
            <div class="navbar align-self-center d-flex">
                <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                    <div class="input-group">
                        <input type="search" class="form-control" id="inputMobileSearch" placeholder="Search ...">
                       
                        <div class="input-group-text">
                            <i class="fa fa-fw fa-search"></i>
                        </div>
                    </div>
                    <div id="search-list"></div>
                </div>
                <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal"
                    data-bs-target="#templatemo_search">
                    <i class="fa fa-fw fa-search  mr-2"></i>
                </a>
                <a class="nav-icon position-relative text-decoration-none" href="#">
                    <i class="fa fa-fw fa-cart-arrow-down  mr-1"></i>
                    <span
                        class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
                </a>
                <a class="nav-icon position-relative text-decoration-none" href="#">
                    <i class="fa fa-fw fa-user mr-3"></i>
                    <span
                        class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark"></span>
                </a>
            </div>
            <button id="logout" class="btn btn-success">????ng xu???t</button>
        </div>

    </div>
</nav>
<!-- Close Header -->`
},
async afterRender(){
document.querySelector("#logout").addEventListener("click", function() {
    console.log("Hola!!!");
    localStorage.removeItem("username");
    window.location.hash = "/login";
});
$("#inputMobileSearch").addEventListener("keyup", async (e) => {
    e.preventDefault();
    const inp = $("#inputMobileSearch").value;
    const { data: products } = await ProductAPI.search(inp);
    if (inp == "") {
      $("#search-list").style.display = "none";
    } else {
      const searchProduct = products.filter((product) => product.name)
        .map((search) => {
          return /*html*/ `<ul class="list-group z-50"> <a href="/#/products/${search.id}"><li class="z-50 list-group-item"> 
          <span><img src="${search.image}" class="w-20 " alt=""></span>${search.name}</li></a> </ul>`;
        })
        .join("");
      $("#search-list").style.display = "block";
      $("#search-list").innerHTML = searchProduct;
    }
  });
}
}
export default Header;