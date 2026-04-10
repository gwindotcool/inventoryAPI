const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Middleware
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload = require('../middleware/cloudinary');

// Protect all routes
// router.use(protect);

// Routes
router.post('/products', authorizeRoles('admin'), productController.createProduct);
router.get('/products', authorizeRoles('salesperson'), productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// ✅ Upload image
router.patch(
    '/products/:id',
    upload.single('imageUrl'),
    productController.updateProductImage
);

// ✅ Create with image + email
router.post(
    '/createProductwithEmail',
    upload.single('imageUrl'),
    productController.createProductwithEmail
);

module.exports = router;