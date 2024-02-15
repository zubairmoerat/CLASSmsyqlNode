import express from 'express';
import bodyParser from 'body-parser';
import { products } from '../model/index.js';

const producctsRouter = express.Router()

producctsRouter.get('/',(req, res)=>{
    try{
        products.fetchProducts(req,res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve products"
        })
    }
})
producctsRouter.get('/:id',(req, res)=>{
    try{
        products.fetchProduct(req,res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve product"
        })
    }
})
producctsRouter.post('/addProduct', bodyParser.json(), (req, res)=>{
    try{
        products.addProduct(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to add new product"
        })
    }
})
export{
    producctsRouter
}