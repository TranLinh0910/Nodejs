import User from '../models/user';
exports.userById =(req,res,next,id)=>{
    
User.findById(id).exec((error,user)=>{
    if(error|| !user){
        return res.status(400).json({
            error:'User not found'
        })
    }

    req.profile=user;
    next()
})
}
//add
export const read=(req,res)=>{
req.profile.hashed_password=undefined;
req.profile.salt=undefined;
return res.json(req.profile);
}
//sửa
export const update=(req,res)=>{
User.findOneAndUpdate(
    {_id:req.profile.id},//tìm cái id người dùng muốn sửa
    {$set:req.body},//lấy dữ liệu mới nhập từ form
    {new:true},//dùng lại cái dữ liệu để đẩy lên
    (err,user)=>{
        if(err){
            return res.status(400).json({
                error:'yeo are not authorized to perfrom in action'
            })
        }
        req.profile.hashed_password=undefined;
        req.profile.salt=undefined;
        res.json(user);
    }
)
}