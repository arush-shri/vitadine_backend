const express = require("express");
const app = express();
const router = express.Router();
const orderRoutes = require("./controller/orderHandlerRoute");
const menuRoute = require("./controller/menuHandlerRoute")
const cors = require("cors");

app.set("view engine", "ejs")
app.use('/controller', express.static('public/controller'));
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
});

app.use("/routes", router);
app.use("/order", orderRoutes);
app.use("/menu", menuRoute);

const port = 4000;
app.listen(port, () => {
    console.log("Server started at port 4000");
})
