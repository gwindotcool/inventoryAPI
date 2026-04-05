const Product = require("../models/products");

//CREATE

exports.createProduct = async (req, res) => {
    const products = await Product.create(req.body);
    res.status(201).json(products);
}

//get all product
exports.getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(200).json(products);
}

//get one product

exports.getProduct = async (req, res) => {
    const { id } = req.params
    const products = await Product.findById(id)
    if (!products) {
        res.status(404).json("Product not found");
    }
    res.status(200).json(products);
}

//update Product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const products = await Product.findByIdandUpdate(req.params.id,req.body, {new:true})
    if (!products) {
        res.status(404).json("Product not found");
    }
    res.status(200).json(products);
}

//delet product

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const products = await Product.findByIdandDelete(id)
    if (!products) {
        res.status(404).json("Product not found");
    }
    res.status(200).json(products);
}