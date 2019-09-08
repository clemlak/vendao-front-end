const coinbase = require('coinbase-commerce-node');

const { Client } = coinbase;
const { Charge } = coinbase.resources;

class CoinbaseCommerce {
  constructor(API_KEY) {
    this.API_KEY = API_KEY;
    this.client = Client.init(API_KEY);
  }


  async createCharge(chargeObj) {
    let charge = new Charge(chargeObj);
    console.log("Uploading new charge via save...");
    const res = await charge.save();
    console.log(`Response ID: ${res.id}`);
    return res;
  }
}


export default CoinbaseCommerce;
