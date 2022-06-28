const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

// FOCUS HERE :-
const provider = new HDWalletProvider(
  // Change these parameters
  "Your metamask Mnemonic for testing",
  "Your Infura Key"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi There!"],
    })
    .send({ from: accounts[0], gas: 1000000 });

  console.log("Contract deployed to: ", result.options.address);
  provider.engine.stop();
};

deploy();
