const serviceModel=require('../Model/ServiceRecordModel')

const createService=async function(req,res){
    try{
let service=req.body;
await serviceModel.create(service);
return res.status(200).send({msg:'service is created'});
    } catch (error){
        res.status(500).send(error.message)
    
    }










    
}
module.exports.createService=createService;






