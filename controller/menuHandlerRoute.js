const expres = require("express");
const { editPrice, getMenu, addItem, deleteItem } = require("./menuHandler")
const menuRoute = expres.Router();

menuRoute.get('/menu', async (req, res) => {
    const menu = await getMenu(req.body.canteenName)
    res.status(200).send(menu)
})

menuRoute.post('/editPrice', async (req, res) => {
    await editPrice(req.body.canteenName, req.body.category , req.body.foodName, req.body.price)
    res.status(200)
})

menuRoute.post('/addItem', async (req, res) => {
    await addItem(req.body.canteenName, req.body.category, req.body.foodName, req.body.price)
    res.status(200)
})

menuRoute.delete('/deleteItem', async (req, res) => {
    await deleteItem(req.body.canteenName, req.body.category, req.body.foodName)
    res.status(200)
})

module.exports = menuRoute;