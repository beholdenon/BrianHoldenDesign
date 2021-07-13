var express = require('express');
var router = express.Router();
var projects = require('../services/projects.js');
var landingPage = require('../services/landingPage.js');
var skills = require('../services/skills.js');

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

module.exports = router;
