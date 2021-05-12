import Product from '../models/product';
import formidale from 'formidable';
import fs from 'fs';
import _ from 'lodash'

// export const create = (req, res) => {
//     //truy vấn db thêm sp vào
//     let form = new formidale.IncomingForm();
//     form.keepExtensions = true;
//     //gui du lieu 
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "Them san pha khong thanh cong"
//             })
//         }
//         //
//         const { name, description, price } = fields;
//         if (!name || !description || !price) {
//             return res.status(400).json({
//                 error: "Bạn cần nhập đầy đủ thông tin"
//             })
//         }
//         let product = new Product(fields);
//         if (files.photo) {
//             //1kb= 1000
//             //1mb =100000
//             if (files.photo.size > 1000000) {
//                 res.status(400).json({
//                     error: "Bạn nên upload ảnh mới 1mb"
//                 })
//             }
//             product.photo.data = fs.readFileSync(files.photo.path);
//             product.photo.contentType = files.photo.path;
//         }
//         product.save((err, data) => {
//             if (err) {
//                 res.status(400).json({
//                     error: "Không thêm được sp"
//                 })
//             }
//             res.json(data)
//         })
//     });


// }

export const create = (req, res) => {
  
    const product = new Product(req.body);
    
    product.save((err, data) => {
        //dùng phương thức save để lưu dữ liệu từ người nhập
        if (err) {
            return res.status(400).json({
                error: "Khong them duoc sản phẩm"
            })
           
        }
        res.json( data );
    })
}
export const productById = (req, res, next, id) => {
    //chi tiet sp
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            res.status(400).json({
                error: "Khong tim thay san pham",
            });
        }
        req.product = product;
        next();
    });
};
export const read = (req, res) => {
    return res.json(req.product);
}
export const remove = (req, res) => {
    let product = req.product;
    // khai báo biến product gán cho giá trị 
    
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Khong xoa duoc sp"
            })

        }
        res.json({
            deletedProduct,
            message: "San pham da duoc xoa thanh cong"
        })
    })
}
//danh sach sp
export const list = (req, res) => {
    Product.find((err, data) => {

        if (err) {
            return res.status(401).json({
                error: "Khong tim thay san pham"
            })
        }
        res.json(data)
    })
}
// export const update = (req, res) => {
//     let form = new formidale.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: "sửa san pham khong thanh cong"
//             })
//         }
//         const { name, description, price } = fields;
//         if (!name || !description || !price) {
//             return res.status(400).json({
//                 error: "Bạn cần nhập đầy đủ thông tin"
//             })
//         }
//         //let product = new Product(fields);
//         let product = new Product(fields);
//         product = _.assignIn(product, fields)
//         // let product=req.product;
//         if (files.photo) {
//             //1kb= 1000
//             //1mb =100000
//             if (files.photo.size > 1000000) {
//                 res.status(400).json({
//                     error: "Bạn nên upload ảnh mới 1mb"
//                 })
//             }
//             product.photo.data = fs.readFileSync(files.photo.path);
//             product.photo.contentType = files.photo.path;
//         }
//         product.save((err, data) => {
//             if (err) {
//                 res.status(400).json({
//                     error: "Không sửa được sp"
//                 })
//             }
//             res.json(data)
//         })
//     });

// }
export const update = (req, res) => {
    let product = req.product;
    //tạo biến này để gửi dữ liệu đã sửa lên server
    product = _.assignIn(product, req.body);
    //_.assignIn nếu người ng dùng k muốn sửa dữ liệu thì sẽ để nguyên như thế
    console.log(product);
    product.save((err, data) => {
        
      if (err) {
        return res.status(400).json({
          error: "Không sửa được sản phẩm !",
        });
      }
      return res.json(data);
    });
  };
// router.get("/product/photo/:productId", photo)
// export const photo = (req, res, next) => {
//     if (req.product.photo.data) {
//         res.set("Content-Type", req.product.photo.contentType);
//         return res.send(req.product.photo.data);
//     }
//     next();
// }


