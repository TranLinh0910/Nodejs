import ProductAPI from "../api/productApi";
import { reRender, $ } from "../utils.js";
const ListProduct = {
  async render() {
    //render(phương thức) hiện thị from
    const { data: products } = await ProductAPI.getAll();
    
    return /*html*/ `
    <div>Tổng sản phẩm: ${products.length}</div>
    <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>số lượng</th>
        <th>Ảnh sản phẩm</th>
        <th>Thao tác</th>
      
      </tr>
    </thead>
    <tbody>
    ${products
      .map((product, index) => {
        return /*html*/ `
      <tr>
        <td>${index}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td><img src = "${product.image}" width="200px" /></td>
        <td>
        <a href = "/#/editproduct/${product._id}/"  class = "btn btn-primary"> Update </a>
        <button data-id ="${product._id}" class = "btn btn-remove btn-danger"> Remove </button>
        </td>
      </tr>`;
      })
      .join("")}
      
    </tbody>
  </table>`;
  },
  async afterRender() {
    const btns = $("#list-products .btn-remove");
    //tạo biến btns để lấy button 
    console.log(btns);
    btns.forEach((btn) => {
      //forEach để duyệt từng cái btn 
      const {id} = btn.dataset;
      //lấy btn thông qua id
      btn.addEventListener("click", async function () {
        const question = confirm("Bạn có chắc muốn xóa không?");
        if (question) {
          await ProductAPI.remove(id);
          //sau khi click vào btn thì sẽ gửi yêu cầu lên api để xóa
          await reRender(ListProduct, "#list-products");
          //dùng để k cần phải load lại mới bt đc hành động đã xóa 
        }
      });
    });
  },
};
export default ListProduct;
