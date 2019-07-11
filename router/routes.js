//jshint esversion: 6

//Routing requests for /api/... handled here. Modular express app used
//exclusively for routing.

const express = require('express');
const router = express.Router();
const logic = require('./logic.js');

router.get('/market', (req,res) => {
  logic.markets(req,res);
});


//Uses bitcoin average API for crypto data
router.get('/crypto', (req,res) =>{
  logic.crypto(req,res);
});


//Uses News API to gather top financial related headlines for today
router.get('/news', (req,res) =>{
  logic.news(req,res);
});

//Looks for job listings on authentic jobs related to finance and non-related areas
router.get('/jobs', (req,res) => {
  logic.jobs(req,res);
});

module.exports = router;
