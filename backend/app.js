import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productRouter from './routes/product.js'

const app = express();
dotenv.config();
app.use(morgan('dev'));

app.use('/api', productRouter);


const port = process.env.POST || 8000
app.listen(port, () => {
    console.log(`server is runing on port:${port}`);
})