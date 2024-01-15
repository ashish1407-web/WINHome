const Order=require('../Model/OrdersModel')
const service=require('../Model/ServiceRecordModel')

const createOrder = async function (req, res) {
    try {
        const newOrderData = req.body;
        const userId=req.params.Id;
          console.log(userId);
        if ( !newOrderData.totalfee || !newOrderData.services) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const threeHoursAgo = new Date();
        threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
           const userExist=await Order.findOne({
               Users:userId,
           })
           if(userExist){
              const serviceId=await Order.findOne({
                'services.serviceId': newOrderData.services[0].serviceId,
              })
               if(serviceId){
                     const recentOrder=await Order.findOne({
                        dateTime: { $gt: threeHoursAgo }
               })
                 if(recentOrder){
                    return res.status(400).json({ error: 'Cannot create a new order within 3 hours of an existing order' });
                 }else{
                    await Order.updateOne(
                        { Users: userId },
                        { $addToSet: { 'services': { serviceId: serviceId } } }
                    );
                 }
               }
           }
          newOrderData.Users=userId;
        await Order.create(newOrderData);
        return res.status(201).json({ msg: 'Order created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getOrder=async function(req,res){
try{
let orders=await Order.find().populate('services.serviceId');
const formattedOrders = orders.map(order => {
    return {
        id: order._id,  
        datetime: order.dateTime.toISOString(),
        totalfee: order.totalfee,
        services: order.services.map(service => {
            return {
                id: service.serviceId._id  
            };
        })
    };
});

return res.status(200).json({ data: formattedOrders });
}catch(err){
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
}
}
const updateOrder = async function (req, res) {
    try {
        const orderId = req.query.id;
        const threeHoursAgo = new Date();
        threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

        const existingOrder = await Order.findOne({
            _id: orderId,
            'services.serviceId': newOrderData.services[0].serviceId,
            dateTime: { $gt: threeHoursAgo }
        });

        if (existingOrder) {
            return res.status(400).json({ error: 'Cannot update an order within 3 hours of an existing order' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
        
        return res.status(200).json({ data: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const deleteOrder = async function (req, res) {
    try {
        const orderId = req.params.id; 
        const deletedOrder = await Order.findByIdAndRemove(orderId);
        return res.status(200).json({ data: deletedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder: updateOrder,
    deleteOrder:deleteOrder
};





