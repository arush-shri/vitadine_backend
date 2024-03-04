const { database } = require('./DBConnector');

async function placeOrder(canteenName, orderList, regNum, phoneNum){

    const canteenDB = database.collection(canteenName+"Orders");
    const orderQuery = {
        "orderList": orderList,
        "RegNum": regNum,
        "phoneNum": phoneNum,
        "canteenName": canteenName,
        "status": "Order is being prepared"
    };

    const result1 = await database.collection("AllOrders").insertOne(orderQuery);
    const result2 = await canteenDB.insertOne(orderQuery);

    ordering(regNum, orderQuery);

    if(result2.acknowledged && result1.acknowledged){
        return true;
    }
    else{
        return result2;
    }
}


async function getOrder(regNum){
    const orderDB = database.collection("AllOrders");
    const result = await orderDB.findOne({"RegNum": regNum});
    if(result){
        return true;
    }
}

//CANTEEN SPECIFIC FUNCTIONS
async function orderStatusChange(canteenName, regNum, status){
    const canteenDB = database.collection(canteenName+"Orders");
    const orderDB = database.collection("AllOrders");
    await canteenDB.updateOne({"RegNum": regNum}, {"$set": {"status":status}});
    const result = await orderDB.updateOne({"RegNum": regNum}, {"$set": {"status":status}});
    if(result.modifiedCount === 1){
        return true;
    }
}

async function getCanteenOrder(canteenName){
    const canteenDB = database.collection(canteenName+"Orders");
    const result = await canteenDB.find();
    if(result){
        return result;
    }
}
module.exports = { placeOrder, getOrder, orderStatusChange, getCanteenOrder }