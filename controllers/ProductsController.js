import express from 'express';
import bodyParser from 'body-parser';
import { products } from '../model/index.js';

const productsRouter = express.Router()

productsRouter.get('/',(req, res)=>{
    try{
        products.fetchProducts(req,res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve products"
        })
    }
})
productsRouter.get('/:id',(req, res)=>{
    try{
        products.fetchProduct(req,res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve product"
        })
    }
})
productsRouter.post('/addProduct', bodyParser.json(), (req, res)=>{
    try{
        products.addProduct(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to add new product"
        })
    }
})
productsRouter.patch('/updateProduct/:prodID',bodyParser.json(), (req, res)=>{
    try{
        products.updateProduct(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to update product"
        })
    }
})
productsRouter.delete('/deleteProduct/:prodID',bodyParser.json(),(req, res)=>{
    try{
        products.deleteProduct(req, res)
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to delete product"
        })
    }
})
export{
    productsRouter
}