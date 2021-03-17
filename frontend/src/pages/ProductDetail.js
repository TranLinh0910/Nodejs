// import data from "../data.js";
// import axios from "axios";
import ProductAPI from "../api/productApi.js";
import { parseRequestUrl } from "../utils.js";
const ProductDetail = {
  async render() {
    // const response = await axios(
    //   "https://5e79b4b817314d00161333da.mockapi.io/products"
    // );
    // const products = await response.data;
    const { id } = parseRequestUrl();
    const { data: product } = await ProductAPI.get(id);

    // console.log(request.id);
    // const product = products.find((product) => product.id == id);
    return `<div class="container mt-4 mb-4">
    <div class="row">
          <div class="col-md-3 col-lg-3">
              <img width="100%" src="${product.image}" alt="">
          </div>
          <div class="col-md-6 col-lg-6">
              <h3 class="text-center">${product.name}</h3>
              <p>Form Tiêu Chuẩn</p>
              <table class="table ">
                  <thead>
                    <tr>
                      <th colspan="4">Tiết kiệm -37,000 đ</th>
                    </tr>
                  </thead>
                  <tbody class="text-center">
                    <tr>
                      <th scope="row">0020165001</th>
                      <td>Xám, S</td>
                      <td>37 CH còn	</td>
                      <td>Sale  ${product.price} <del class="text-danger">400,000 vnđ</del></td>
                    </tr>
                    <tr>
                      <th scope="row">0020165002</th>
                      <td>Xám, S</td>
                      <td>37 CH còn	</td>
                      <td>Sale ${product.price} <del class="text-danger">400,000 vnđ</del></td>
                    </tr>
                    <tr>
                      <th scope="row">0020165002</th>
                      <td>Xám, S</td>
                      <td>37 CH còn	</td>
                      <td>Sale ${product.price} <del class="text-danger">400,000 vnđ</del></td>
                    </tr>
                  </tbody>
                </table>
                
                <h5>Hướng dẫn chọn size</h5>
                <p>
                  Dựa trên dữ liệu đánh giá từ những khách hàng đã mua sản phẩm. Chúng tôi có thể hỗ trợ bạn tìm một size phù hợp với bạn, bạn có thể tham khảo
                </p>
                <button type="button" class="btn btn-danger">Mua ngay</button>
          </div>
          <div class="col-md-3 col-lg-3">
                  <h4>Mô tả sản phẩm</h4>
                  <p style="padding-top: 10px; font-size: 15px;">
                      Chất liệu: Cotton Compact <br> 
                      Thành phần: 100% cotton <br>
                      - Thân thiện <br>
                      - Thấm hút thoát ẩm <br>
                      - Mềm mại <br>
                      - Kiểm soát mùi <br>
                      - Điều hòa nhiệt <br>
                      + Họa tiết in bột nổi <br>
                      - HDSD: <br>
                      + Nên giặt chung với sản phẩm cùng màu <br>
                      + Không dùng thuốc tẩy hoặc xà phòng có tính tẩy mạnh <br>
                      + Nên phơi trong bóng râm để giữ sp bền màu
                  </p>
          </div>
    </div>
  </div>
            
            
            `;
  },
};

export default ProductDetail;
