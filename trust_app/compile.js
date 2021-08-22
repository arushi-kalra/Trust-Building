const path = require('path');
const fs = require('fs');
const solc = require('solc');

const trustPath = path.resolve(__dirname, 'contracts', 'trust.sol');
const source = fs.readFileSync(trustPath, 'utf8');

console.log(solc.compile(source, 1));
module.exports = solc.compile(source, 1).contracts[':trust'];