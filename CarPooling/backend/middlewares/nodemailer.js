const mailer = require("nodemailer");
const mailGen = require("mailgen");



function generateOTP() {  
    let digits = '0123456789'; 
    let OTP = ''; 
    let len = digits.length 
    for (let i = 0; i < 4; i++) { 
        OTP += digits[Math.floor(Math.random() * len)]; 
    } 
    return OTP; 
} 


const verifyEmployee = async (req, res) => {

        
        const email = "marthapavan2002@gmail.com";
        const password = "ruic aetu mzlj krwb";


        const config ={
            service :"gmail",
            auth:
            {
                user:email,
                pass:password
            }
        }


        const transporter = mailer.createTransport(config);
        let mailGenerator = new mailGen({
            theme:"default",
            product:{
                name:"Carpool Admin",
                link:"https://mailgen.js/"
            }
        });


        const response = {
           body: {
            name:req.body.userName,
            intro:"Your request is received",
            table:{
                data:[{
                    reistrationNumber:req.body.registrationNumber,
                    OTP:"your otp is:"+generateOTP()
                }],
                outro:"looking forward for your reply"
            }
          }
        }


        const mail = mailGenerator.generate(response);
        const message = {
            from :email,
            to:"pavan.sabavath@gmail.com",
            subject:"registered successfully",
            html:mail
        }


        transporter.sendMail(message)
        .then((res)=> res.status(201).json({msg:"email sent successfully"}))
        .catch(err=>res.status(404).json({msg:"failed"}));


}


module.exports = verifyEmployee;