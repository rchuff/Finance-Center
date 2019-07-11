//jshint esversion: 6

//Assembles crypto/market info we receive from the API into concise data
//needed for the front end.

//Assemble market data with proper formatting to send to the front end.
exports.assembleMarkets = vals => {
  let marketData = {};
  vals.forEach((retProm) => {
    let parseData = JSON.parse(retProm);
    //Based on returned symbol update marketData object with necessary info.
    switch (parseData["Global Quote"]["01. symbol"]) {
      case "^DJI":
        marketData.DJI = {};
        marketData.DJI.title = 'DOW';
        marketData.DJI.price = parseData["Global Quote"]["05. price"];
        marketData.DJI.change = parseData["Global Quote"]["09. change"];
        break;
      case "MSFT":
        marketData.MSFT = {};
        marketData.MSFT.title = 'Microsoft';
        marketData.MSFT.price = parseData["Global Quote"]["05. price"];
        marketData.MSFT.change = parseData["Global Quote"]["09. change"];
        break;
      case "GOLD":
        marketData.GOLD = {};
        marketData.GOLD.title = 'Gold';
        marketData.GOLD.price = parseData["Global Quote"]["05. price"];
        marketData.GOLD.change = parseData["Global Quote"]["09. change"];
        break;
      case "^GSPC":
        marketData.GSPC = {};
        marketData.GSPC.title = 'S&P 500';
        marketData.GSPC.price = parseData["Global Quote"]["05. price"];
        marketData.GSPC.change = parseData["Global Quote"]["09. change"];
        break;
      case "AMZN":
        marketData.AMZN = {};
        marketData.AMZN.title = 'Amazon';
        marketData.AMZN.price = parseData["Global Quote"]["05. price"];
        marketData.AMZN.change = parseData["Global Quote"]["09. change"];
        break;
    }
  });
  return marketData;
};


//Assemble crypto information with proper formatting to send to the front end.
exports.assembleCrypto = vals => {
  let cryptoInfo = {};
  vals.forEach((retProm) => {
    let parseData = JSON.parse(retProm);
    //Based on returned symbol update cyptoInfo object with necessary info.
    switch (parseData.display_symbol) {
      case "BTC-USD":
        cryptoInfo.BTC = {};
        cryptoInfo.BTC.title = 'Bitcoin';
        cryptoInfo.BTC.price = `${parseData.ask} USD`;
        cryptoInfo.BTC.change = `${parseData.changes.percent.day}`;
        break;
      case "BCH-USD":
        cryptoInfo.BTH = {};
        cryptoInfo.BTH.title = 'Bitcoin Cash';
        cryptoInfo.BTH.price = `${parseData.ask} USD`;
        cryptoInfo.BTH.change = `${parseData.changes.percent.day}`;
        break;
      case "LTC-USD":
        cryptoInfo.LTC = {};
        cryptoInfo.LTC.title = 'Litecoin';
        cryptoInfo.LTC.price = `${parseData.ask} USD`;
        cryptoInfo.LTC.change = `${parseData.changes.percent.day}`;
        break;
      case "ETH-USD":
        cryptoInfo.ETH = {};
        cryptoInfo.ETH.title = 'Ethereum';
        cryptoInfo.ETH.price = `${parseData.ask} USD`;
        cryptoInfo.ETH.change = `${parseData.changes.percent.day}`;
        break;
      case "XRP-USD":
        cryptoInfo.XRP = {};
        cryptoInfo.XRP.title = 'Ripple';
        cryptoInfo.XRP.price = `${parseData.ask} USD`;
        cryptoInfo.XRP.change = `${parseData.changes.percent.day}`;
        break;
      case "XMR-USD":
        cryptoInfo.XMR = {};
        cryptoInfo.XMR.title = 'Monero';
        cryptoInfo.XMR.price = `${parseData.ask} USD`;
        cryptoInfo.XMR.change = `${parseData.changes.percent.day}`;
        break;
      default:

    }
  });
  return cryptoInfo;
};
