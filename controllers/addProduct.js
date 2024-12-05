const product = require('../models/product');
const {sessions} = require('../middlewares/cAuth');
async function addProductToInventory(req, res){
    try {
        const sessionCookie = req.cookies.sessionId;
        const username = sessions[sessionCookie].data.username;
        const { name, price, quantity, category } = req.body;
        const newProduct = new product({ username:username,name: name.toUpperCase(), price: price, qty:quantity, category: category.toUpperCase() });
        await newProduct.save();
        res.redirect('/?alert=true&message=Product added successfully!');
    } catch (error) {
        console.error('Error adding product:', error);
        res.redirect('/?alert=true&message=Error adding product.');
    }
};
module.exports = {
    addProductToInventory,
}