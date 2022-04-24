const nodemailer = require('nodemailer');

exports.generateOTP = () => {
    let otp = ""
    for (let i = 0; i <= 3; i++) {
        const randomValue = Math.round(Math.random() * 9)
        otp = otp + randomValue;
    }
    return otp;
}

exports.mailTransport = () => {

    var transport = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: process.env.PORT,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    });

    return transport;
}

exports.generateEmailTemplate = code => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        @media only screen and (max-width:620px) {
            h1 {
                font-size: 20px;
                padding: 5px;
            }
        }
    </style>
</head>

<body>
    <div>
        <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">

            <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">We are delighted to
                welcome you to our AppsDeployer Team</h1>
            <p>Please Verify your email to continue your verification code is: </p>
            <p
                style="width: 80px; margin: 0 auto; font-weight: bold; text-align: center; background: #f6f6f6; border-radius: 5px; font-size: 25px;">
                ${code}</p>

        </div>
    </div>
</body>

</html>
    `;
}

exports.plainEmailTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
            @media only screen and (max-width:620px) {
                h1 {
                    font-size: 20px;
                    padding: 5px;
                }
            }
        </style>
    </head>
    
    <body>
        <div>
            <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
                <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">${heading}</h1>
                <p style="color: #272727; text-align: center;">${message}</p>
            </div>
            
    </body>
    
    </html>
   `;
}