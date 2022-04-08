const express = require("express");
const cors = require("cors")
const { default: mongoose } = require("mongoose");
const bodyParser = require('body-parser')
const Routes = require("./routes/routes")
const path = require('path')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/', Routes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    // app.use(slashes(false))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.zhgqg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
).then(() => {
    app.listen(9000)
    console.log("Connection successful!!")
}).catch((err) => {
    console.log(err)
})