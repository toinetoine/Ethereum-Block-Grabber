var express = require("express");
var app = express();
var async = require("async");

var fs = require("fs");

var Web3 = require('web3');


var grabBlocks = function(config) {
	
	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:" + gethPort.toString()));
	setTimeout(function() {
		grabBlock(config, web3, "latest");
	}, 10000);
}


var grabBlock = function(config, web3, blockHash) {
	if(web3.isConnected()) {
		web3.eth.getBlock(blockHash, function(error, blockData) {
			if(error) {
				console.log("Error: Aborted due to error on getting block with hash: " +
					blockHash);
				console.log("Error Received: " + error);
				process.exit(9);
			}
			else {
				// Grab each of the block's transactions and add it to the blockData's 
				// transactions array before writing the blockData to the file
				if('transactions' in blockData && !Array.isArray(blockData.transactions)) {

					// copy the transaction hashes and clear the transactions array 
					// (will now be an array an array of transaction objects rather 
				  // than just transaction hash strings)
					var txHashes = blockData.transactions.slice();
					blockData.transactions = [];

					async.forEachSeries(txHashes, function(txHash, callback) {
						web3.eth.getTransaction(txHash, function(error, transactionData) {
							blockData.transactions.push(transactionData);
							callback();
						});
					}, function(error) {

						console.log("got all " + (blockData.transactions.length) + 
							" transactions for block: " + blockData.hash);

						// write the block info to a json file
						writeBlockToFile(config, blockData);
						if('parentHash' in blockData) {
							grabBlock(config, web3, blockData.parentHash);
						}
					});
				}
				else {
					writeBlockToFile(config, blockData);
					if('parentHash' in blockData) {
						grabBlock(config, web3, blockData.parentHash);
					}
				}
			}
		});
	}
	else {
		console.log("Error: Aborted due to web3 is not connected when trying to " +
			"get block with hash: " + blockHash);
		process.exit(9);
	}
}


var writeBlockToFile = function(config, blockData) {
	var blockFilename = blockData.hash + ".json";
	var fileContents = JSON.stringify(blockData, null, 4);

	// TODO: write the blockData to the file
	fs.writeFile(config.output + "/" + blockFilename, fileContents, function(error) {
		if(error) {
			console.log("Error: Aborted due to error on writting to file for block number " +
				blockData.number.toString() + ": '" + config.output + "/" +
				blockFilename + "'");
			console.log("Error Received: " + error);
			process.exit(9);

			return console.log(error);
		}
		else {
			console.log("File successfully written for block number " +
				blockData.number.toString() + ": '" + config.output + "/" +
				blockFilename + "'");
		}
	}); 
}


/** On Startup **/
// start geth with: geth --rpc --rpccorsdomain "http://localhost:8000"
// read input arguments
// possible args: 
//		ouput (output directory, this directory if not provided)
//		gethPort (geth port on local host (optional, defult = 8545))

try {
	data = fs.readFileSync('foo.bar');
}
catch (error) {
	if (error.code === 'ENOENT') {
		console.log('File not found!');
	}
	else {
		throw error;
	}
}

var configContents = fs.readFileSync("config.json");
var config = JSON.parse(configContents);

// set the default geth port if it's not provided
if(!('gethPort' in config) || (typeof config.gethPort) != "number") {
    config.gethPort = 8545; // default
}

// set the default output directory if it's not provided
if(!('ouput' in config) || (typeof config.ouput) != "string") {
    config.ouput = "."; // default this directory
}


grabBlocks(config);


app.listen(4000);
