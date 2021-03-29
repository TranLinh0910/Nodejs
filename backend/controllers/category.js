
import Category from '../models/category'
export const create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Khong them duoc danh muc"
            })
        }
        res.json({ data });
    })
}
export const list = (req, res) => {
    Category.find((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Danh muc khong ton tai"
            })
        }
        res.json({ categories });
    })
}
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            res.status(400).json({
                error: "Khong tim thay danh muc"
            })
        }
        req.category = category;
        next()
    })
}
export const read = (req, res) => {
    return res.json(req.category);
}
export const update =(req,res)=>{
    const category=req.category;
    category.name=req.body.name;
    category.save((err,data)=>{
        if(err||!category){
            res.status(400).json({
                error:"Danh muc nay khong ton tai"
            })
        }
        res.json({data})
    })
}
export const remove =(req,res)=>{
    let category=req.category;
    category.remove((err,deleteCategory)=>{
        if(err||!category){
            res.status(400).json({
                error:"Danh muc nay khong ton tai"
            })
        }
        res.json({deleteCategory,message:"Xoa danh muc thanh cong"})
    })


}

