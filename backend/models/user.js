import mongoose from "mongoose";
const crypto=require("crypto");//ma hoa mat khau
const {v1: uuidv1}=require("uuid");
const Schema =mongoose.Schema;
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    hashed_password:{
        type:String,
        require : false
    },
    about:{
         type:String,
         trim:true
    },
    salt:{
        type:String
    },
    role:{
type:Number,
default:0
    },
    history:{
        type:Array,
        default:[]
    },

},{timestamps:true})
userSchema.virtual('password')// Tạo ra 1 file
.set(function(password){
    this.salt=uuidv1()//unique
    this.hashed_password=this.encrytPassword(password) //ma dinh tra ve mot mat khau
})
userSchema.methods={
    authenticate:function(plainText){
        // tạo phương thức cho model
        return this.encrytPassword(plainText)===this.hashed_password;
        

    },
    encrytPassword:function(password){
        if(!password)return'';
        try{
            return crypto
            .createHmac('sha1',this.salt)//MA HOa mk
            .update(password)
            .digest('hex')
        }catch(error){
            return "";
        }
    }
}
module.exports=mongoose.model('User',userSchema);
// dinh dang kieu du lieu tren mongoose