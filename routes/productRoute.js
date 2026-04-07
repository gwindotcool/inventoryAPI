const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


//Middleware
const {protect} = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/roleMiddleware');

router.use(protect);

router.post('/products',authorizeRoles('admin'), productController.createProduct);
router.get('/products',authorizeRoles('salesperson'),productController.getAllProducts);
router.get('/products/:id', productController.getProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
