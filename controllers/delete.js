const product = require('../models/product');
const { sessions } = require('../middlewares/cAuth');
async function handleDeleteProduct(req, res) {
    try {
        const sessionCookie = req.cookies.sessionId;
        if (!sessionCookie || !sessions[sessionCookie]) {
            return res.status(401).redirect('/login');
        }
        const username = sessions[sessionCookie].data.username;
        const productId = req.params.id;
        const result = await product.deleteOne({ _id: productId, username });
        if (result.deletedCount === 0) {
            return res.redirect('/?alert=true&message=Product not found or unauthorized.');
        }
        res.redirect('/?alert=true&message=Product deleted successfully!');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.redirect('/?alert=true&message=Error deleting product.');
    }
}
module.exports = {
    handleDeleteProduct,
};
