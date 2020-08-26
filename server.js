const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const Student = require("./models/Student")
const mongoose = require("mongoose")
const validator = require("validator")
const { response } = require("express")


const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

//connect local
//mongoose.connect("mongodb://localhost:27017/The_secondDB_created", {useNewUrlParser: true});

//connect to the app by altas
mongoose.connect("mongodb+srv://luozhongtain:lzt611789@cluster0.lg159.mongodb.net/The_SignDB_created?retryWrites=true&w=majority", 
{useNewUrlParser: true});

//在这个我文件中使用model里面的Student的Schema
app.post('/', (req,res)=>{
  
    const Country = req.body.country 
    const firstname = req.body.first_name
    const lastname = req.body.last_name
    const email = req.body.email
    const Password = req.body.password
    const Conpassword = req.body.c_password

    const ZIP = req.body.zip
    const MPN = req.body.m_pn
    const City = req.body.C_ity
    const State = req.body.S_tate
    const Address = req.body.A_ddress


    //利用model里面的Student以创建自己的student
    const student = new Student({
        The_country : Country,
        The_fname : firstname,
        The_lname : lastname,
        The_email : email,
        The_password : Password,
        The_confirm_password : Conpassword,
        The_address : Address,
        The_ZIP : ZIP,
        The_mpn : MPN,
        The_city : City,
        The_state : State,
    })    
    
    student
    .save()
    .catch((err) => console.log(err))  
    if(res.statusCode == 200)
    {
        res.sendFile(__dirname + "/success.html")  
    }
    else
    {
        res.sendFile(__dirname + "/404.html")
    } 
    {
    //the API
    const data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname,
                ADDRESS: email
            }
        }]
    }
    const jsonData = JSON.stringify(data)//make it become json
    const apiKey = "c258d91ad1bee6ef34d4c32e487dbf26-us17"
    const list_id ="3beaa3283f"
    const url ="https://us17.api.mailchimp.com/3.0/lists/3beaa3283f"
    
    const options = {
        method: "POST",
        auth: "Lucas:c258d91ad1bee6ef34d4c32e487dbf26-us17"
    }

    const requst = https.request(url, options, (response)=>{

        response.on("data", (data)=>{
            console.log(JSON.parse(data))
        })
    })
    requst.write(jsonData)
    requst.end() 
    console.log(firstname, lastname,email)
    }
    
    //


})



let port = process.env.POST;
if (port == null || port == "") {
  port = 5500;
}
//app.listen(process.env.PORT || 8080)
app.listen(port, (req,res) => {
    console.log("Server is running on port successfully")
})