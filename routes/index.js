require('dotenv').config();

var express = require('express');
var router = express.Router();
var projects = require('../services/projects.js');
var landingPage = require('../services/landingPage.js');
var skills = require('../services/skills.js');
var nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

router.use(function (req, res, next) {
  projects.getProjects().then((projectsCollection) => {
    req.projects = projectsCollection.items;
    next();
  }).catch((err) => {
    console.log('projects.js - getProjects (line 23) error:', JSON.stringify(err,null,2));
    next();
  });
});

router.use((req, res, next) => {
  landingPage.getLandingPage().then(function (landingPageCollection) {
    req.landingPage = landingPageCollection.items;
    next();
  }).catch((err) => {
    console.log('landingPage.js - getLandingPage (line 23) error:', JSON.stringify(err,null,2));
    next();
  });
});

router.use((req, res, next) => {
  skills.getSkills().then(function (skillsCollection) {
    req.skills = skillsCollection.items;
    console.log(req.skills);
    next();
  }).catch((err) => {
    console.log('skills.js - getSkills (line 23) error:', JSON.stringify(err,null,2));
    next();
  });
});

router.get('/', (req, res, next) => {
  res.render('index', {'projects': req.projects, 'landingPage': req.landingPage, 'skills': req.skills });
});

router.post('/', 
  body('fname').isLength({ min: 2 }),
  body('email').isEmail(),
  body('message').isLength({ min: 2 }),

  function(req, res){
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fname = req.body.fname;
    const email = req.body.email;
    const message = req.body.message;

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
    subject: process.env.SITE_NAME + ' Contact Us Form Submission',
    html: 'Name: ' + fname + '<br />Email Address: ' + email + '<br />Message: ' + message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  var obj = {};
  res.send("{'success': 1 }");
});

module.exports = router;
