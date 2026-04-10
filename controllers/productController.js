const Product = require("../models/products");
const cloudinary = require("../config/cloudinaryconfig");


const User = require("../models/users")
const sendEmail = require("../middleware/emaiSender");

exports.createProductwithEmail = async (req, res) => {
    try {
        const { name, price, quantity, imageUrl } = req.body || {};

        const products = new Product({ name, price,quantity,imageUrl });
        await products.save();

        // 🔥 Get all admins
        const admins = await User.find({ role: "admin" });
        const adminEmails = admins.map(a => a.email);

        // 📧 Send email
        const subject1 = "New message";
        const message1 = `
      <h3>New Product Alert 🚀</h3>
      <p>A new product has been created:</p>
      <ul>
        <li><strong>Name:</strong> ${products.name}</li>
        <li><strong>Price:</strong> ${products.price}</li>
        <li><strong>quantity:</strong> ${products.quantity}</li>
        <li><strong>Image:</strong> ${products.imageUrl}</li>
        
      </ul>
    `;

        if (adminEmails.length > 0) {
            await sendEmail("gwindotcool@gmail.com", subject1, message1);
        }

        return res.status(201).json({
            message: "Product created and admins notified",
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};





exports.updateProductImage = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // delete old image from Cloudinary if it exists
        if (product.ImageUrl) {
            const parts = product.ImageUrl.split("/");
            const filename = parts[parts.length - 1];
            const publicId = filename.split(".")[0];

            await cloudinary.uploader.destroy(`products/${publicId}`);
        }

        // update with new image
        product.imageUrl = req.file.path;

        await product.save();

        return res.status(200).json({
            message: "Image updated successfully",
            product,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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
    const products = await Product.findByIdAndUpdate(req.params.id,req.body, {new:true})
    if (!products) {
        res.status(404).json("Product not found");
    }
    res.status(200).json(products);
}

//delet product

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const products = await Product.findByIdAndDelete(id)
    if (!products) {
        res.status(404).json("Product not found");
    }
    res.status(200).json(products);
}