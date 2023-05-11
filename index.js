
const express = require("express")
const routes = require("./config/routes")
const app = express()
const port = 3050


const configureDB = require("./config/database")

app.use(express.json())
app.use("/", routes)

configureDB()


app.listen(port, () => {
    console.log("server is running on port" , port)
})