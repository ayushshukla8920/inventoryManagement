const user = require('../models/user');
const product = require('../models/product');
const {sessions} = require('../middlewares/cAuth');

function formatIndianNumber(number) {
    let numStr = number.toString();
    let [integer, decimal] = numStr.split('.');
    let lastThree = integer.substring(integer.length - 3);
    let otherNumbers = integer.substring(0, integer.length - 3);
    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }
    let formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return decimal ? formattedInteger + '.' + decimal : formattedInteger;
}

async function handleHomePageRender(req,res){
    const sessionCookie = req.cookies.sessionId;
    if(sessionCookie){
        if(sessions[sessionCookie]){
            const username = sessions[sessionCookie].data.username;
            const result = await user.find({username: username});
            const products = await product.find({username: username});
            const totalPrice = products.reduce((sum, product) => sum + (product.price * product.qty), 0);
            const formattedTotalPrice = formatIndianNumber(Number(totalPrice).toFixed(2));
            const alert = req.query.alert || false;
            const message = req.query.message || "";
            return res.status(200).render('home',{name: result[0].name,products: products,alert: alert==='true',message: message,totalPrice: formattedTotalPrice});
        }
    }
    else{
        return res.status(404).redirect('/login');
    }
}
module.exports = {
    handleHomePageRender,
}