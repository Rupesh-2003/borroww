const express = require("express");
const cors = require("cors")
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser')
const Routes = require("./routes/routes")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/', Routes)

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.zhgqg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
).then(() => {
    app.listen(6000)
    console.log("Connection successful!!")
}).catch((err) => {
    console.log(err)
})