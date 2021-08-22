const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'topic witness argue lab junk profit slot infant switch vague crumble check',
    'https://ropsten.infura.io/v3/4521f08ab35a4aa5a0194c6e62f2e045'
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    let result;

    try {
        result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: '0x0' + bytecode })
            .send({ gas: '3000000', value: "1000000000000000000", from: accounts[0] });
    }
    catch (err) {
        console.log('Error: ', err.message);
    }

    if (result) {
        console.log('Contract deployed to', result.options.address);
    }
}

deploy();