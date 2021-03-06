import categoryApi from "../api/categoryApi";
import ProductApi from "../api/ProductApi"
import Header from "../components/Header";
const HomePage = {

    async render() {
        const { data: products } = await ProductApi.getAll();
        const { data: categories } = await categoryApi.getAll();
        return /*html*/` <!-- Modal -->
        <div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="w-100 pt-1 mb-5 text-right">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" method="get" class="modal-content modal-body border-0 p-0">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control" id="inputModalSearch" name="q" placeholder="Search ...">
                        <button type="submit" class="input-group-text bg-success text-light">
                            <i class="fa fa-fw fa-search text-white"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    
    
    
        <!-- Start Banner Hero -->
        <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" class="active"></li>
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" >
                <div class="carousel-item active">
                    <div class="container">
                        <div class="row p-5">
                            <div class="mx-auto col-md-12 col-lg-12 order-lg-last">
                                <img class="img-fluid" src="https://img3.thuthuatphanmem.vn/uploads/2019/10/14/banner-thoi-trang-hien-dai-dep-nhat_113857069.jpg"  alt="">
                            </div>

                        </div>
                    </div>
                </div>


                <div class="carousel-item">
                    <div class="container">
                        <div class="row p-5">
                            <div class="mx-auto col-md-12 col-lg-12 order-lg-last">
                                <img class="img-fluid" src="https://img3.thuthuatphanmem.vn/uploads/2019/10/14/anh-lookbook-thoi-trang_113854100.jpg" alt="">
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="container">
                    <div class="row p-5">
                    <div class="mx-auto col-md-12 col-lg-12 order-lg-last">
                        <img class="img-fluid" src="https://zelus.com.vn/uploads/news/2018_02/banner-top-trang-chu-1-slide-19.jpg" alt="">
                    </div>
                   
                </div>
                    </div>
                </div>
            </div>
         
        </div>
        <!-- End Banner Hero -->
    
        <!-- Danh m???c -->
    <div class="container mt-4 mb-4">
    <h1 class="h1 mt-4 mb-4 text-center">Danh m???c s???n ph???m</h1>
<div class="row">
${categories.map(category => {
            return /*html*/`<div class="col-3 mt-4">
    <a href="/#/category/${category._id}" style="text-decoration: none;">
    <div class="card">
  <img class="card-img" style="object-fit: cover" height="270px" src="${category.photo}">
  <div class="card-body">
    <p class="card-text text-center">${category.name}</p>
  </div>
</div>
</a>
    </div>`
        }).join("")}
</div></div>
        <!--End Danh m???c -->
      
    
    
        <!-- Start Featured Product -->
        <section class="bg-light">
            <div class="container py-5">
                <div class="row text-center py-3">
                    <div class="col-lg-6 m-auto">
                        <h1 class="h1">??o nam n???i b???t</h1>
                    </div>
                </div>
                <div class="row">
                ${products.filter(item => item.category == "607d32932184c449b4762a0f").map(product => {
            return ` <div class="col-12 col-md-3 mb-4 ">
                <div class="card h-100 ">
                    <a href="shop-single.html">
                        <img src="${product.image}" style="object-fit:cover;" class="card-img" height="300px" alt="...">
                    </a>
                    <div class="card-body">
                    <h3 class = "text-center text-info">${product.name}</h3>
                      <p class="text-right">  ${product.price}?? <del> </del></p>
                        <a class="btn btn-success text-center" href="/#/products/${product._id}">Chi Ti???t</a>
                     </div>
                </div>
            </div>`

        }).slice(0, 4).join("")}
                   
                   
                </div>
            </div>
            
        </section>
        <section class="bg-light">
        <div class="container py-3">
            <div class="row text-center py-3">
                <div class="col-lg-6 m-auto">
                    <h1 class="h1">??o n??? n???i b???t</h1>
                </div>
            </div>
            <div class="row">
            ${products.filter(item => item.category == "607d315b6d887517e41e6c04").map(product => {
            return ` <div class="col-12 col-md-3 mb-4 ">
            <div class="card h-100 ">
                <a href="shop-single.html">
                    <img src="${product.image}" style="object-fit:cover;" class="card-img" height="300px" alt="...">
                </a>
                <div class="card-body">
                <h3 class = "text-center text-info">${product.name}</h3>
                  <p class="text-right">  ${product.price}?? <del> </del></p>
                    <a class="btn btn-success text-center" href="/#/products/${product._id}">Chi Ti???t</a>
                 </div>
            </div>
        </div>`

        }).slice(0, 4).join("")}
               
               
            </div>
        </div>
        
    </section>

    <section class="bg-light">
    <div class="container py-3">
        <div class="row text-center py-3">
            <div class="col-lg-6 m-auto">
                <h1 class="h1">??o Hodie</h1>
            </div>
        </div>
        <div class="row">
        ${products.filter(item => item.category == "607d369d2184c449b4762a12").map(product => {
            return ` <div class="col-12 col-md-3 mb-4 ">
        <div class="card h-100 ">
            <a href="shop-single.html">
                <img src="${product.image}" style="object-fit:cover;" class="card-img" height="300px" alt="...">
            </a>
            <div class="card-body">
            <h3 class = "text-center text-info">${product.name}</h3>
              <p class="text-right">  ${product.price}?? <del> </del></p>
                <a class="btn btn-success text-center" href="/#/products/${product._id}">Chi Ti???t</a>
             </div>
        </div>
    </div>`

        }).slice(0, 4).join("")}
           
           
        </div>
    </div>
    
</section>

<section class="bg-light">
<div class="container py-5">
    <div class="row text-center py-3">
        <div class="col-lg-6 m-auto">
            <h1 class="h1">Qu???n, v??y n???i b???t</h1>
        </div>
    </div>
    <div class="row">
    ${products.filter(item => item.category == "607d36aa2184c449b4762a13").map(product => {
            return ` <div class="col-12 col-md-3 mb-4 ">
    <div class="card h-100 ">
        <a href="shop-single.html">
            <img src="${product.image}" style="object-fit:cover;" class="card-img" height="300px" alt="...">
        </a>
        <div class="card-body">
        <h3 class = "text-center text-info">${product.name}</h3>
          <p class="text-right">  ${product.price}?? <del> </del></p>
            <a class="btn btn-success text-center" href="/#/products/${product._id}">Chi Ti???t</a>
         </div>
    </div>
</div>`

        }).slice(0, 4).join("")}
       
       
    </div>
</div>

</section>
       
        <!-- End Featured Product -->`
    },
    async afterRender() {
        return `${await Header.afterRender()}`
    }
}
export default HomePage;