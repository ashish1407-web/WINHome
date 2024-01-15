const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
      Users:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Users'
      },
    totalfee: {
        type: Number,
        trim: true
    },
    dateTime: {
        type: Date,
        default: Date.now, 
        trim: true
    },
    services: [
        {
        serviceId: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Service'
        }
    }
]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);








