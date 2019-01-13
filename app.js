const express = require('express');
const sendGrid = require('./api');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', function(req, res){
    res.redirect("/index");
});

app.get("/index", function(req, res){
    res.render("index", contactMsg="");
});

// Contact Form Route
app.post("/send", function(req, res){
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message:</h3>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: sendGrid.user, // SendGrid API
            pass: sendGrid.pass // SendGrid key
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Half Pint Games" <noreply@halfpintgames.com>', // sender address
        to: 'michael.ac.king@outlook.com', // list of receivers
        subject: 'New Contact Form Message', // Subject line
        text: '', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render("contact", {msg: "Your message has been sent."});
    });
});

// Port
let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}
app.listen(port, function(){
    console.log("Server started...")
});
