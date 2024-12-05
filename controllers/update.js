const product = require('../models/product');
const { sessions } = require('../middlewares/cAuth');
async function handleUpdateProduct(req, res) {
    try {
        const sessionCookie = req.cookies.sessionId;
        if (!sessionCookie || !sessions[sessionCookie]) {
            return res.status(401).redirect('/login');
        }
        const username = sessions[sessionCookie].data.username;
        const productId = req.params.id;
        const { name, price, quantity, category } = req.body;
        const result = await product.updateOne(
            { _id: productId, username },
            { $set: { name: name.toUpperCase(), price, qty: quantity, category: category.toUpperCase() } }
        );
        if (result.modifiedCount === 0) {
            return res.redirect('/?alert=true&message=No changes made.');
        }
        res.redirect('/?alert=true&message=Product updated successfully!');
    } catch (error) {
        console.error('Error updating product:', error);
        res.redirect('/?alert=true&message=Error updating product.');
    }
}
module.exports = {
    handleUpdateProduct,
};
