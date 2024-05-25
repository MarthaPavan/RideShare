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

    console.log(req.method);
    const email = "marthapavan2002@gmail.com";
    const password = "yehz vsvz acvr dfqv";


    const config = {
        service: "gmail",
        auth:
        {
            user: email,
            pass: password
        }
    }


    const transporter = await mailer.createTransport(config);
    let mailGenerator = new mailGen({
        theme: "default",
        product: {
            name: "Carpool Admin",
            link: "https://mailgen.js/"
        }
    });


    const response = {
        body: {
            name: "Madhukar Reddy",
            intro: "Your request is received",
            table: {
                data: [{
                    registrationNumber: "TS1234",
                    OTP: "your otp is:" + generateOTP()
                }],
                outro: "looking forward for your reply"
            }
        }
    }


    const mail = await mailGenerator.generate(response);
    const message = {
        from: "marthapavan2002@gmail.com",
        to: "anveshnallamadha@gmail.com",
        subject: "registered successfully",
        html: mail
    }

    transporter.sendMail(message)
        .then((res) => res.status(201).json({ msg: "email sent successfully" }))
        .catch(err => res.status(200).json({ msg: "failed" }));
}


module.exports = verifyEmployee;