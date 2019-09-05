const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    usuario:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
});


const UserModel=mongoose.model('user',userSchema);
module.exports=UserModel;