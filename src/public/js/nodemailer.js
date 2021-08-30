var nodemailer = require('nodemailer');
// email sender function
exports.sendEmail = function(req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'kinotrance@gmail.com',
            pass: 'n|yOm*Vx]p{X~IhNi'
        }
    });
// Definimos el email
var mailOptions = {
    from: 'K1n0 Trance',
    to: 'edisonupb2013@gmail.com',
    subject: 'Nueva Tarea',
    text: 'Nueva Tarea en K1n0C0m'
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        //res.send(500, err.message);
    } else {
        console.log("Email sent");
        //res.status(200).jsonp(req.body);
        res.render('links/add');
    }
});
};