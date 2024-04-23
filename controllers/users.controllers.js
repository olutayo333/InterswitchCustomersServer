const userModel = require("../model/user.model");
const merchantModel = require("../model/merchant.model");
let jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");     

const signup = (req,res)=>{
//USER REGISTER
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
    // MERCHANT REGISTRATION
    const merchantRegistration = (req,res)=>{
        let merchantCode = "M-" + (Math.floor((Math.random()*100-1)+1))    
        let merchantData = { 
                    firstname:req.body.firstname, 
                    lastname:req.body.lastname,  
                    email:req.body.email,
                    password:req.body.password,
                    bussinessname:req.body.bussinessname,    
                    merchantCode
             }
        
             let form = new merchantModel(merchantData)
             let merchantEmail = req.body.email   
            
            merchantModel.find({email:merchantEmail})
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

// USER SIGNIN
        let signinEmail
        const signin = (req, res) =>{ console.log(req.body);
        let {email,password} = req.body; signinEmail = req.body.email; signinPassword=req.body.password; 
        userModel.findOne({email:signinEmail} && {password:password} )
        .then((user)=>{
            if(!user){res.send({status:false, message:"invalid login credentials"})}
            else{ console.log(user);
                let secret = process.env.SECRET
                let token = jwt.sign({email}, secret, {expiresIn:10000} ); console.log(token)
                    //let mapeduser = user.map(i=>(i.name, i.accountnumber, i.phonenumber, i.email))
                res.send({status:true, token, message:"signin successful", user})
            }
        })
    }

    //MERCHANT LOGIN
    let merchantSigninEmail; let merchantSigninPassword;
        const merchantSignin = (req, res) =>{ console.log(req.body);
        // let {email,password} = req.body; 
        merchantSigninEmail = req.body.email; merchantSigninPassword=req.body.password; 
        merchantModel.findOne({email:merchantSigninEmail} && {password:merchantSigninPassword} )
        .then((user)=>{
            if(!user){res.send({status:false, message:"invalid login credentials"})}
            else{ console.log(user);
                let secret = process.env.SECRET
                let token = jwt.sign({merchantSigninEmail}, secret, {expiresIn:50000} ); console.log(token)
                    //let mapeduser = user.map(i=>(i.name, i.accountnumber, i.phonenumber, i.email))
                res.send({status:true, token, message:"signin successful", user})
            }
        })
    }

        //CUSTOMERS DASHBOARD
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
        // MERCHANT DASHBOARD
    const merchantDashboard = (req, res) =>{
        let token = req.headers.authorization.split(" ")[1];
        let secret = process.env.SECRET
        jwt.verify(token, secret, (err,result)=>{
         if(err){console.log(err); res.send({status:false, message:"Unauthorized Access"})}
         else{
                merchantModel.findOne({email:merchantSigninEmail})
                .then((user)=>{
                if(!user){res.send({status:false, message:"Not Found"}); console.log("failed");}
                else{res.send({status:true, token, message:"Welcome to your account", user}); console.log(user);}
                }) 
            }
         }) 
    }

    module.exports = {signup, signin, dashboard, merchantRegistration, merchantSignin, merchantDashboard}