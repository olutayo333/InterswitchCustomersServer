const mongoose = require("mongoose") 
const bcryptjs = require("bcryptjs"); const bcrypt = require("bcryptjs/dist/bcrypt");

let merchantSchema= mongoose.Schema({
    firstname:{type: String, required:true },
    lastname:{type: String, required:true },
    email:{type: String, required:true, unique:true},
    password:{type:String, required:true },
    bussinessname:{type:String, required:true },
    merchantCode:{type:String, required:true, }, 
    registrationDate:{type:Date, default:Date.now()},
}) 

//PASSWORD HASHING
// let saltRound=10;
// bankUsersSchema.pre("save", function(next){
//     console.log(this.password)
//     // bcrypt.hash(password,saltRound,callback)
//     bcryptjs.hash(this.password,saltRound,(err,hashedPassword)=>{
//         console.log(hashedPassword)
//        if(err){console.log("password could not hash" + err)}
//        else{ 
//         this.password = hashedPassword
//         next()}  
//     })     
// })
// //PASSWORD UNHASHING
// bankUsersSchema.methods.validatePassword = function(password,callback){
//     bcrypt.compare(password, this.password, (err, same)=>{
//         console.log(same);
//         if(!err){callback(err,same)}
//         else{next()}
//     })
// }
let MerchantsModel = mongoose.model("MerchantsDetails", merchantSchema)
module.exports = MerchantsModel