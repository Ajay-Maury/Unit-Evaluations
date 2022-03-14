//mongodb+srv://pata_nahi:bhool_gaya@cluster0.lsvn5.mongodb.net/BankAccounts?retryWrites=true&w=majority
const express = require("express")
const mongoose = require("mongoose")
const app = express();
app.use(express.json())
const connect = ()=>{
    return mongoose.connect("mongodb+srv://pata_nahi:bhool_gaya@cluster0.lsvn5.mongodb.net/BankAccounts?retryWrites=true&w=majority")
    
} 



// user schema
const userSchema = mongoose.Schema({
    firstName : {type:String,requires:true},
    middleName : {type:String},
    lastName : {type:String,requires:true},
    age : {type:Number,required:true},
    email : {type : String,required:true},
    address : {type:String,required:true},
    gender : {type:String,default:"Female"},
    type :{type:String,default:"customer"},
},
    {
        versionKey:false,
         timestamps:true,
    }
)

// user model
const User = mongoose.model("user",userSchema)


// branch model
const branchSchema = mongoose.Schema({
    name : {type:String,required:true},
    address : {type:String,required:true},
    IFSC : {type:String,required:true},
    MICR : {type:Number,required:true}
},
    {
        versionKey:false,
         timestamps:true,
    }
)
// branch model
const branch = mongoose.model("branch",branchSchema)

// masterAccount schema
const masterAccountSchema = mongoose.Schema({
    balance : {type:Number,required:true},
    userId : {type:mongoose.Schema.Types.ObjectId,
             ref : "user",
             required:true,
             unique:true,
    },
    branchId : {type:mongoose.Schema.Types.ObjectId,
             ref : "branch",
             required:true,
             unique:true,
    },
    savingAccountID : [{type:mongoose.Schema.Types.ObjectId,
        ref : "savingAccount",
        unique:true
        }
    ],
    fixedAccountID : [{type:mongoose.Schema.Types.ObjectId,
        ref : "fixedAccount",
        unique:true
        }
    ],
},
    {
        versionKey:false,
         timestamps:true,
    })

//master account model
const MasterAccount = mongoose.model("masteraccount",masterAccountSchema)

// saving account schema
const savingAccountSchema = mongoose.Schema({
    account_number : {type:Number,required:true,unique:true},
    balance : {type:Number,required:true},
    intrestRate : {type:Number,required:true},
},
    {
        versionKey:false,
         timestamps:true,
    })

// saving account model
const SavingAccount = mongoose.model("savingAccount",savingAccountSchema)

// fixed account schema
const fixedAccountSchema = mongoose.Schema({
    account_number : {type:Number,required:true,unique:true},
    balance : {type:Number,required:true},
    intrestRate : {type:Number,required:true},
    startDate : {type:Date,required:true},
    maturityDate : {type:Date,required:true},
},
    {
        versionKey:false,
         timestamps:true,
    })

// fixed account model
const FixedAccount = mongoose.model("fixedAccount",fixedAccountSchema)


app.get("users",async (req,res)=>{
    try {
        const user = await MasterAccount.find({}).lean().ecxc()
        
    } catch (error) {
        console.log(error.message)
    }
})

app.post("savingaccount",async (req,res)=>{
    try {
        const saving = await SavingAccount.create(req.body)
        return res.send(saving)
        
    } catch (error) {
        console.log(error)
    }
})

app.post("fixedaccount",async (req,res)=>{
    try {
        const fixed = await FixedAccount.create(req.body)
        return res.send(fixed)
        
    } catch (error) {
        console.log(error)
    }
})



app.get("/",(req,res)=>{
    return res.send("Hello Port working")
})



app.get("masteraccount/:id",async (req,res)=>{
    const master = await MasterAccount.findById(req.params.id).lean().exec()
})


app.listen(4000,async ()=>{
    try {
        await connect()
        console.log("Listening at 4000")        
    } catch (error) {
        console.log(error.message)
    }
})