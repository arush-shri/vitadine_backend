const express = require("express");
const { editPrice, getMenu, addItem, deleteItem } = require("./menuHandler");
const menuRoute = express.Router();

menuRoute.get('/getMenu', async (req, res) => {
    try {
        // if (!req.body.canteenName) {
        //     return res.status(400).send("Canteen name is required.");
        // }
        
        const menu = await getMenu("ub");
        res.status(200).send(menu);
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).send("Internal Server Error");
    }
});

menuRoute.post('/editPrice', async (req, res) => {
    try {
        const { canteenName, category, foodName, price } = req.body;
        if (!canteenName || !category || !foodName || !price) {
            return res.status(400).send("All fields are required.");
        }

        await editPrice(canteenName, category, foodName, price);
        res.status(200).send("Price updated successfully.");
    } catch (error) {
        console.error("Error editing price:", error);
        res.status(500).send("Internal Server Error");
    }
});

menuRoute.post('/addItem', async (req, res) => {
    try {
        const { canteenName, category, foodName, price } = req.body;
        if (!canteenName || !category || !foodName || !price) {
            return res.status(400).send("All fields are required.");
        }

        await addItem(canteenName, category, foodName, price);
        res.status(200).send("Item added successfully.");
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).send("Internal Server Error");
    }
});

menuRoute.delete('/deleteItem', async (req, res) => {
    try {
        const { canteenName, category, foodName } = req.body;
        if (!canteenName || !category || !foodName) {
            return res.status(400).send("All fields are required.");
        }

        await deleteItem(canteenName, category, foodName);
        res.status(200).send("Item deleted successfully.");
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = menuRoute;