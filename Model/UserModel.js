const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        true:true
    }
    },{ timestamps: true })
    module.exports=mongoose.model('Users',userSchema)







