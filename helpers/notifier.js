var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

var mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_RECEPIENT,
    subject: '(no-reply) Movie Wishlist status',
    html: '' // plaintext body
};

function sendMail(resolve, reject, message) {
    mailOptions.html = JSON.stringify(message);
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            reject(error);
        } else {
            resolve(info.response);
        }
    });


}
module.exports.sendMail = sendMail;