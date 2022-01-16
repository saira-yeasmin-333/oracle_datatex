const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser=require('body-parser')
const authRouter=require('./route/authentication/authRouter')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiBase="/datatex"
app.use(apiBase+'/auth',authRouter)
const port=process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening at port : ${port}`)
})