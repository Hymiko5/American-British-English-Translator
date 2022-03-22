// Do not change this file
require('dotenv').config();

const mongoose = require('mongoose');
const URI = process.env['MONGO_URI'];

main().catch(error => {
  console.log(error);
  throw new Error('Unable to Connect to Database');
});

async function main() {
  await mongoose.connect(URI);
}

const americanWordSchema = new mongoose.Schema({
  American: { type: String, required: true, unique: true },
  British: { type: String, required: true }
});

const AmericanWord = mongoose.model('AmericanWord', americanWordSchema);

const britishWordSchema = new mongoose.Schema({
  British: { type: String, required: true, unique: true },
  American: { type: String, required: true }
});

const BritishWord = mongoose.model('BritishWord', britishWordSchema);


module.exports = { AmericanWord, BritishWord };