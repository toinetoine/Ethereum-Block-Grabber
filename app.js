var express = require("express");
var app = express();
var fs = require("fs");

var Web3 = require('web3');


var grabBlocks = function(config) {
	var web3 = new Web3(new Web3.providers.HttpProvider(config.gethUrl));
	setTimeout(function() {
		grabBlock("latest");
	}, 10000);
}

var grabBlock = function(config, blockHash) {
	if(web3.isConnected()) {
		web3.eth.getBlock("latest", function(error, blockData) {
			if(error) {
				console.log(error);
				return;
			}

			console.log(blockData); //TESTING

			// grab all the transaction infos
			if('transactions' in blockData) {
				for(var txI = 0; txI < blockData.transactions; txI++) {
					var txHash = blockData.transactions[txI];
					// TODO: with  need to grab transaction data and set to blockData.txs array of objects 
					// for all transactions in block, then with a promise write to json file
				}
			}

			// write the block info to a json file
			writeToFile(config, blockData);

			// complete -> signify and go onto next block
			console.log("Grabbed and stored block number: " + blockData.number + ", hash: " + blockData.hash);
			if('parentHash' in blockData) {
				grabBlock(config, blockData.parentHash);
			}
		});
	}
}


var writeToFile = function(config, blockData) {
	var outputDirectory = ".";
	if('output' in config && (typeof config.output) != "string" ) {
		outputDirectory = config.output;
	}

	// TODO: write the blockData to the file
}



/** On Startup **/
// start geth with: geth --rpc --rpccorsdomain "http://localhost:8000"
// read input arguments
// possible args: 
//		ouput (output directory, this directory if not provided)
//		gethUrl (geth url, mandatory)
var configContents = fs.readFileSync("config.json");
var config = JSON.parse(configContents);


if(!('gethUrl' in config) || (typeof config.gethUrl) != "string"  || config.gethUrl.length == 0) {
    console.log("Error: In config.json 'output': expecting string value for the url geth is running on. (should be http://localhost:8545 by default for local geth instance)");
    process.exit(9);
}

grabBlocks(config);


app.listen(4000);
