import express from 'express'
import {isAdmin,isAuth,requireSignin} from "../controllers/auth"
import { update,list,create, productById, read, remove,photo} from '../controllers/product'
 //import products from '../models/product'
 import {userById} from "../controllers/user"
const router = express.Router();


//them sp
router.get('/product/:productId',read)
router.get('/')
router.post("/product/:userId/create",requireSignin,isAuth,isAdmin,create);
router.get('/product',list);
router.put('/product/:userId/:productId',requireSignin,isAuth,isAdmin,update);
router.get('/product/:productId', read);
router.delete('/product/:userId/:productId',requireSignin,isAuth,isAdmin,remove);
router.param('productId', productById);
router.param('userId',userById)


// app.get('/' (res,req)=>{})



module.exports = router;