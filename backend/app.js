import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category';


const app = express();
dotenv.config();
app.use(bodyParser.json());

app.use(morgan('dev'));
//Connectinon
mongoose.connect(process.env.MONGGO_URI, {
    useNewUrlParser: false,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then((data) => {
    console.log(`Database connected`)
});
mongoose.connection.on('Error', err => {
    console.log(`Data connet failed ,${err.message}`);
})
//Routes
app.use('/api', productRouter);
app.use('/api', categoryRouter);


const port = process.env.PORT || 8000

//create server
app.listen(port, () => {
    console.log(`server is runing on port:${port}`);
})