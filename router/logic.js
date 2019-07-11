//jshint esversion: 6

const request = require('request');
const rp = require('request-promise-native');
const structure = require('./structure.js');

//Handles the logic for returning information to the front end after the API calls.

//Returned promises from AlphaVantage API assembled in the structure document.
exports.markets = (req,res) => {
  let baseURL = 'https://www.alphavantage.co/query?symbol=';
  let endURL = '&function=GLOBAL_QUOTE&apikey=DBFRV0KUSA9BVTGP';
  Promise.all([
    rp.get(`${baseURL}DJI${endURL}`),
    rp.get(`${baseURL}MSFT${endURL}`),
    rp.get(`${baseURL}GOLD${endURL}`),
    rp.get(`${baseURL}GSPC${endURL}`),
    rp.get(`${baseURL}AMZN${endURL}`)
  ])
  .then((values) =>{
    let returnedObj = structure.assembleMarkets(values);
    res.send(returnedObj);
  })
  .catch((err) => console.log(err));
};


//Returned promises from Bitcoin Average assembled in the structure document.
exports.crypto = (req,res) => {
  let baseURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/';
  Promise.all([
    rp.get(`${baseURL}BTCUSD`),
    rp.get(`${baseURL}BCHUSD`),
    rp.get(`${baseURL}LTCUSD`),
    rp.get(`${baseURL}ETHUSD`),
    rp.get(`${baseURL}XRPUSD`),
    rp.get(`${baseURL}XMRUSD`)
  ])
  .then((values) => {
    let returnedObj = structure.assembleCrypto(values);
    res.send(returnedObj);
  });
};

//Requests the top 5 news stories from News API in the business section.
exports.news = (req,res) => {
  rp.get('https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=20&apiKey=6bb019ffe90149218d0e8e32df308cba')
  .then((data) => {
    let parseData = JSON.parse(data);
    res.send(parseData);
  })
  .catch((err) => console.log(err));
};


//Uses authentic jobs API for job listings.
exports.jobs = (req,res) => {
  let baseURL = 'https://authenticjobs.com/api/?method=aj.jobs.search&perpage=5&api_key=602828f4b358fc87905a6e5a25e254af&format=json';
  let financeURL = 'https://authenticjobs.com/api/?method=aj.jobs.search&keywords=finance,marketing,accounting,sales&perpage=1&api_key=602828f4b358fc87905a6e5a25e254af&format=json';

  //Send back compiledData to front end
  let compiledData = {};
  compiledData.jobs = {};
  compiledData.jobs.finance = [];
  compiledData.jobs.all = [];

  //Initial request to get jobs related to finance, marketing, accounting, and sales from authentic
  rp.get(financeURL)
  .then((data) => {
    let parseData = JSON.parse(data);
    let jobListings = parseData.listings.listing;
    jobListings.forEach((listing) =>{
      compiledData.jobs.finance.push(listing);
    });
    //Check amount of listings. If not enough then request jobs outside finance.
    if (jobListings.length < 5){
      return rp.get(baseURL);
    }
    else res.send(compiledData);
  })

  //returned promise for all job listings
  .then((data) => {
    let parseData = JSON.parse(data);
    let jobListings = parseData.listings.listing;
    jobListings.forEach((listing) =>{
      compiledData.jobs.all.push(listing);
    });
    res.send(compiledData);
  })
  .catch((err) => console.log(err));
};
