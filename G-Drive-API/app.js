const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const Login = require("./routes/loginRoutes")
const Register = require("./routes/registertionRoutes")
const StorageRoute = require("./routes/StorageRoute");
const Auth = require("./middleware/autherization");
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/" , Login);
app.use("/" , Register)
app.use("/" , Auth , StorageRoute)

app.get('/',(req,res)=>{
    res.status(200).json({
        "Message":"Server is OK"
    })
})

module.exports = app