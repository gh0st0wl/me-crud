const express = require("express")
const mongoose = require("mongoose")
const Car = require("./model/Cars")
const carRoutes = require("./routes/car");
const cors = require('cors');


require("dotenv").config()



const app = express()

app.use(express.json())
app.use(cors())


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use("/api/cars", carRoutes)


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongodb bağlantısı kuruldu")
        app.listen(process.env.PORT, () => {
            console.log("3000 server çalıştı")
        })
    })