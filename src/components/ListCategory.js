import categoryApi from "../api/categoryApi";
import { reRender, $ } from "../utils.js";
const ListCategory = {
  async render() {
    const { data: categories } = await categoryApi.getAll();
    return /*html*/ `
    <div>Tổng sản phẩm: ${categories.length}</div>
    <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Ảnh</th>
        <th>Thao tác</th>
      
      </tr>
    </thead>
    <tbody>
    ${categories
      .map((category, index) => {
        return /*html*/ `
      <tr>
        <td>${index}</td>
        <td>${category.name}</td>
        <td><img src = "${category.photo}" width="200px" /></td>
        <td>
        <a href = "/#/editcategory/${category._id}/"  class = "btn btn-primary"> Update </a>
        <button data-id ="${category._id}" class = "btn btn-remove btn-danger"> Remove </button>
        </td>
      </tr>`;
      })
      .join("")}
      
    </tbody>
  </table>`;
  },
  async afterRender() {
    const btns = $("#list-categories .btn-remove");
    console.log(btns);
    btns.forEach((btn) => {
      const {id} = btn.dataset;
      btn.addEventListener("click", async function () {
        const question = confirm("Bạn có chắc muốn xóa không?");
        if (question) {
          await categoryApi.remove(id);
          await reRender(ListCategory, "#list-categories");
        }
      });
    });
  },
};
export default ListCategory;
