const { database } = require('./DBConnector');

async function getMenu(canteenName){
    const canteenDB = database.collection(canteenName);
    const result = await canteenDB.find();
    return result;
}

async function editPrice(canteenName, category, itemName, newPrice) {
    try {
        const canteenDB = database.collection(canteenName);
        
        const filter = {};
        const update = { $set: { [`${category}.$[item].${itemName}`]: newPrice } };
        
        const options = {
            arrayFilters: [{ 'item': { '$exists': true } }]
        };
        
        const result = await canteenDB.updateOne(filter, update, options);
        
        if (result.modifiedCount === 1) {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error("Error editing price:", error);
        return false;
    }
}

async function addItem(canteenName, categoryName, foodName, price) {
    try {
        const canteenDB = database.collection(canteenName);
        
        const filter = {};
        
        const update = { $push: { [categoryName]: { [foodName]: price } } };
        
        const result = await canteenDB.updateOne(filter, update);
        
        if (result.modifiedCount === 1) {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error("Error adding item:", error);
        return false;
    }
}

async function deleteItem(canteenName, category, itemName) {
    try {
        const canteenDB = database.collection(canteenName);
        const filter = {};
        const update = { $unset: { [`${category}.$[item].${itemName}`]: "" } };
        
        const options = {
            arrayFilters: [{ 'item': { '$exists': true } }]
        };
        
        const result = await canteenDB.updateOne(filter, update, options);
        
        if (result.modifiedCount === 1) {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error("Error deleting item:", error);
        return false;
    }
}


module.exports = { editPrice, getMenu, addItem, deleteItem }