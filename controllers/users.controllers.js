const userModel = require("../model/user.model");
let jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");     

const signup = (req,res)=>{
    let userData = { 
            name:req.body.name,  phonenumber:req.body.phonenumber,
            email:req.body.email,
            password:req.body.password,
            physicaladdress:req.body.physicaladdress    
     }  
     let form = new userModel(userData)
     let userEmail = req.body.email   
     
        userModel.find({email:userEmail})
        .then ((result)=>{ console.log(result);
            if(result.length>0){ res.send({status:false, message:"Email Already Exist, Please proceed to Login"}); console.log('user already exist')}
            else{
                form.save()
                .then(()=>{console.log("data saved succesfully ");res.send({status:true, message:"signup was successful"})})
                .catch((err)=>{console.log('Data could not be saved' + err); res.send({status:false, message:"signup not successful"})})                
            }
        })
        .catch((err)=>{console.log(err)})
        console.log(req.body)          
    }  
        let signinEmail
    const signin = (req, res) =>{ console.log(req.body);
        let {email,password} = req.body; signinEmail = req.body.email; signinPassword=req.body.password; 
        userModel.findOne({email:signinEmail} )
        .then((user)=>{
            if(!user){res.send({status:false, message:"invalid login credentials"})}
            else{ console.log(user);
                let secret = process.env.SECRET
                let token = jwt.sign({email}, secret, {expiresIn:900} ); console.log(token)
                    //let mapeduser = user.map(i=>(i.name, i.accountnumber, i.phonenumber, i.email))
                res.send({status:true, token, message:"signin successful", user})
            }
        })
    }
    const dashboard = (req, res) =>{
        let token = req.headers.authorization.split(" ")[1];
        let secret = process.env.SECRET
        jwt.verify(token, secret, (err,result)=>{
         if(err){console.log(err); res.send({status:false, message:"not signin"})}
         else{
                userModel.findOne({email:signinEmail})
                .then((user)=>{
                if(!user){res.send({status:false, message:"Not signedin"}); console.log("failed");}
                else{res.send({status:true, token, message:"Welcome to your account", user}); console.log(user);}
                }) 
            }
         }) 
    }

    module.exports = {signup, signin, dashboard}