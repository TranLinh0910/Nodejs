import ProductAPI from "../api/productApi";
import { reRender, $ } from "../utils.js";
const ListProduct = {
  async render() {
    const { data: products } = await ProductAPI.getAll();
    return /*html*/ `
    <div>Tổng sản phẩm: ${products.length}</div>
    <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
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
        <td><img src = "${product.image}" width="200px" /></td>
        <td>
        <a href = "/#/editproduct/${product.id}/"  class = "btn btn-primary"> Update </a>
        <button data-id ="${product.id}" class = "btn btn-remove btn-danger"> Remove </button>
        </td>
      </tr>`;
      })
      .join("")}
      
    </tbody>
  </table>`;
  },
  async afterRender() {
    const btns = $("#list-products .btn-remove");
    console.log(btns);
    btns.forEach((btn) => {
      const {id} = btn.dataset;
      btn.addEventListener("click", async function () {
        const question = confirm("Bạn có chắc muốn xóa không?");
        if (question) {
          await ProductAPI.remove(id);
          await reRender(ListProduct, "#list-products");
        }
      });
    });
  },
};
export default ListProduct;
