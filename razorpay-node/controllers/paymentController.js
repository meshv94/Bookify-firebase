const Razorpay = require('razorpay'); 
// const {crypto} = require('crypto')
const crypto = require("crypto")
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
// console.log(RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY)

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const createOrder = async(req,res)=>{
    try {
        const {amount , product_name , buyer_name , buyer_email } = req.body;
        console.log(amount , product_name , buyer_name , buyer_email)

        // const amount = 1000;
        const options = {
            amount: amount*100,
            currency: 'INR',
            receipt: 'meshv1444@gmail.com'
        }
        // console.log(options)

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    // console.log(order)
                    res.status(200).send({order , key : RAZORPAY_ID_KEY });
                }
                else{
                    // console.log(error)
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}

const verifyPayment = async(req,res)=>{
    try {
        // getting the details back from our font-end
        const {
            orderCreationId:order_id,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature
        } = req.body;
        // console.log(req.body)

        const shasum = crypto.createHmac("sha256", RAZORPAY_SECRET_KEY);
        // console.log("shasum" , shasum)

        shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");
        console.log("digest" , digest , razorpaySignature)
        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature) return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        res.status(200).json({
            msg: "Payment success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(400).json({ msg : "error in server"})
    }
}


module.exports = {
    createOrder,
    verifyPayment
}