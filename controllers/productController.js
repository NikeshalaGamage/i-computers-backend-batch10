import Product from "../models/product.js";
import {isAdmin} from "./userController.js";


export async function createProduct(req,res){
    if (!isAdmin(req)){
        res.status(403).json({
            message : "Access Denied. Admins Only",

        });
        return;
    }

    try{
        const existingProduct = await Product.findOne({
           productId : req.body.productId,
        });
         if (existingProduct != null){
            res.status(400).json({
                message : "Product with this productId already exist",
            });
            return;
         }

         const newProduct = new Product ({
            productId: req.body.productId,
            name: req.body.name,
            altNames: req.body.altNames,
            price: req.body.price,
            labelledPrice: req.body.labelledPrice,
            descripton : req.body.description,
            images: req.body.images,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            stock:req.body.stock,

         });

         await newProduct.save();

         res.status(201).json({
            message : "Product created successfully",
    
         });
    }catch(error){
        res.status(500).json({
            message : "Error creating product",
        });
    }
}

export async function getAllProducts(req,res){
    try{
        if (isAdmin(req)){

            const products = await  Product.find();

            res.json(products);
        }else{
             const product = await Product.find({isAvailabe: true});

             res.json(products);
        }
    }catch(error){
        res.status(500).json({
            message : "Error fetching products",
        });
    }
}

export async function deleteProduct (req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Access denied. Admin Only.",
        });
        return ;
    }

    try{
        await Product.deleteOne({
            productId : req.params.productId
        })
        res.json({
            message : "Product deleted Successfully",
        });
    }catch(error){
        res.status(500).json({
            message :" Error deleting Product",
        });
    }
}

export async function  updateProduct(req,res){
    if (!isAdmin(req)){
        res.status(403).json({
            message : "Access denied . Admins Only,",
        });
        return;
    }

    try{
        await Product.updateOne({
            productId : req.params.productId},
        
        {
            name : req.body.name,
            altNames : req.body.altNames,
            price : req.body.price,
            labelledPrice : req.body.labelledPrice,
            description :req.body.description,
            images : req.body.images,
            brand : req.body.barnd,
            model : req.body.model,
            category : req.body.category,
            stock : req.body.stock,
            isAvailabe : req.body.isAvailabele


        })
        res.json({
            message : "Product updated successfully."
        });

    }catch(error){
        res.status(500).json({
            message : "Error updating Product."
        });

    }
    
    }

    export async function getProductById(req,res){
        try{
            const product = await Product.findOne({
                productId : req.params.productId
            })
            if(product == null){
                res.status(404).json({
                    message : "Product not Found"
                })
            }else{
                if(product.isAvailable){
                    res.json(product)
                }else{
                    if(isAdmin(req)){
                        res.json(product)
                    }else{
                        res.status(403).json({
                            message : "Access denied. Admins Only"
                        })
                    }
                }
                }
            }catch(error){
                res.status(500).json({
                    message : "Error fetching product",
                });
            }
        }
    
    



