const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    usuario:String,
    password:String
});


const UserModel=mongoose.model('user',userSchema);
module.exports=UserModel;