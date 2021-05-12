import ListCategory from "../components/ListCategory.js";
import ListProduct from "../components/ListProduct.js";
import SideBarMenu from "../components/SidebarMenu.js";

const AdminCategoryPage ={
  async render(){
    return /*html*/`  
    <div class="container mt-4">
    <div class="row">
      <nav class="col-md-2 d-none d-md-block bg-light sidebar">

     ${SideBarMenu.render()}
      </nav>

      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 class="h2">Quản lý danh mục</h1>
          </div>
          <div class="">
        <a href="/#/addcategory"><button class="btn btn-primary">THÊM DANH MUC</button></a>
          </div>
        <div class="table-responsive" id="list-categories">
         ${await ListCategory.render()}
        </div>
      </main>
    </div>
    </div>
    `
},
async afterRender(){
  return ` ${await ListCategory.afterRender()}`
}
};
export default AdminCategoryPage;