require('dotenv').config();

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
	const absoluteRoot = req.protocol + '://' + req.get('host');

  var transporter = nodemailer.createTransport({
  service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

	res.render('index', { 'homepage': req.homepage, 'url': absoluteRoot + req.url, 'image': absoluteRoot + '/images/og-image.jpg', 'title': process.env.PAGE_TITLE });
});

module.exports = router;
