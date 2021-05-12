const User=require ('../models/user' ) ;
import jwt from 'jsonwebtoken';//npm i jsonwebtoken --save
const expressJwt =require('express-jwt');
import dotenv from 'dotenv'


dotenv.config();
//đăng ký
export const signup =(req,res)=>{
    // console.log("request body",req.body);
      //tao ra doi tuong
    const user =new User(req.body);
  
    //luu vao csdl 
user.save((error,user)=>{
    if(error){
        return res.status(400).json({
            error:"Khong the dang ki tai khoan"
        })
    }
    
    user.salt=undefined
    user.hashed_password=undefined
    res.json({user})
})
}
//đăng nhập
//tham số(req,res)
exports.signin=(req,res)=>{
//tìm cơ sở sử dụng trên email
//tạo biến check mail và pass
const{email,password}=req.body;

User.findOne({email},(error,user)=>{
    if(error|| !user){
        return res.status(400).json({
            error:'User with that email does not exist.Please signin '
        })
    }
    
    if(!user.authenticate(password)){
return res.status(401).json({
    error:'Email and password not match'
})
    }
    //tạo mã thông báo đã ký với id người dùng và bí mật
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);// ren ra một cái mã 
    //persist the token as't' in cookie with
    res.cookie('t',token,{exprire:new Date()+9999});
    //return response with user and token to frontend client
    const{_id,name,email,role}=user;
    return res.json(
        {
            token,user:{_id,email,name,role}
        }
    )

})
};
//đăng xuất
exports.signout=(req,res)=>{
    res.clearCookie('t');
    res.json({
        message:'Aignout Success'
    })
};
exports.requireSignin=expressJwt({
    //thuộc tính của thư viện
    secret:process.env.JWT_SECRET,
    //phương thức mã hóa
    algorithms:["HS256"],
    userProperty:"auth",
});
export const isAuth=(req,res,next)=>{
    let user=req.profile && req.auth && req.profile._id==req.auth._id;
    if(!user){
        return res.status(403).json({
            error:"Access Denied"
        })
    }
    next();
}
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role==0){
        return res.status(403).json({
            error:"Admin resource! Access Denined"
        })
    }
    next();
}


