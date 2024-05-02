require("dotenv").config();

const app = require('express')();
var http = require('http').Server(app);
const cors = require('cors')

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))

const paymentRoute = require('./routes/paymentRoute');

app.use('/',paymentRoute);

http.listen(process.env.PORT, function(){
    console.log(`Server is running on ${process.env.PORT}`);
});