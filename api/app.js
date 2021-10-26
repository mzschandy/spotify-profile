const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express() 
const port = 5000

app.use(express.static(path.resolve(__dirname, "../client/public/")))
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.render(path.resolve(__dirname, "../client/public/index.html"))
})

app.listen(port, () => {
  console.log("App running on port", port)
})