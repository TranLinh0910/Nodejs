import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category';
import auth from './routes/auth';
import user from './routes/user';
import cors from 'cors'
// import expressValidator from 'express-validator'
import ExpressValidator from 'express-validator';

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors())


app.use(morgan('dev'));

app.use(ExpressValidator())

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
app.use('/api',auth);
app.use('/api',user);


const port = process.env.PORT || 8000

//create server
app.listen(port, () => {
    console.log(`server is runing on port:${port}`);
})