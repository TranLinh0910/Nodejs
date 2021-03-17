import express from 'express'
const router = express.Router();

//chi tiết
router.get('/product', (req, res) => {
    res.json({
        message: "Hello"
    })
});
//them sp
router.post('/product',(req,res)=>{
//truy vấn db thêm sp vào
});
module.exports = router;