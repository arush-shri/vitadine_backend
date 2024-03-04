const expres = require("express");
const { priceEdit, getMenu } = require("./menuHandler")
const menuRoute = expres.Router();

menuRoute.get('/menu', async (req, res) => {
    const menu = await getMenu(req.body.canteenName)
    res.status(200).send(menu)
})

menuRoute.post('/editPrice', async (req, res) => {
    const menu = await getMenu(req.body.canteenName, req.body.foodName, req.body.price)
    res.status(200)
})

menuRoute.post('/addItem', async (req, res) => {
    const menu = await addItem(req.body.canteenName, req.body.foodName, req.body.price)
    res.status(200)
})

module.exports = menuRoute;