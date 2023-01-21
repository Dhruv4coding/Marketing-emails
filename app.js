const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,(req ,res) =>{
    res.sendFile(__dirname + "/signup.html")
})


app.post("/" ,(req,res) => {
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var email = req.body.email;

    var data = {
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/97d2515456"; 
    const options = {
        method: "POST",
        auth: "dhruv:7790a1fa83d55f02e53e8effa4350c05-us21"
    }
    const request = https.request(url , options, (response) => {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data" , (data) => {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    // if(data.error)
    request.end();
    //
   
})

app.post("/failure" , (req , res) =>{
    res.redirect("/")
})
app.listen(3000 , () => {
    console.log("server is running at 3000 port")
})

// API KEY -7790a1fa83d55f02e53e8effa4350c05-us21