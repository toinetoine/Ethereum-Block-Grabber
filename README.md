# Ethereum Block Grabber
Grabs the entire blockchain from a specified geth instance. Each block will have a json file in the output directory specified looking like this:

```
{
    "number": 1455438,
    "hash": "0x0ff4e11dd10713f86d80c71a3d3566c52b0e40f1eaa822f8c9de5df2a79b50a3",
    "parentHash": "0xc5ea14302610f08f0e8143eff0e05ea1d5ad36b3f424bdef6edbf3029d4d9970",
    "nonce": "0xf31e0378078fbb29",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0xca67929764679c0f8555a741da5845cfd079dc8978c8d53711289848a9fe85fd",
    "stateRoot": "0xef998cece82ee472c447ba7ab3c8c31705612fa06f65e5c628ef44033ef7af4f",
    "receiptRoot": "0xe5df4eae44f971de40f2e11cf5c234f0bc9027cb68d04710269c7700e72c98f4",
    "miner": "0xea674fdde714fd979de3edf0f56aa9716b898ec8",
    "difficulty": "33749678272669",
    "totalDifficulty": "17343299868303719283",
    "size": 767,
    "extraData": "0xd783010400844765746887676f312e352e31856c696e7578",
    "gasLimit": 4712388,
    "gasUsed": 42000,
    "timestamp": 1462363324,
    "transactions": [
        {
            "hash": "0x92dc3abc3a469befaa347d76ebf3213f7ce29bc384b06568a1d9ff406775dd65",
            "nonce": 5917,
            "blockHash": "0x0ff4e11dd10713f86d80c71a3d3566c52b0e40f1eaa822f8c9de5df2a79b50a3",
            "blockNumber": 1455438,
            "transactionIndex": 0,
            "from": "0xd1e56c2e765180aa0371928fd4d1e41fbcda34d4",
            "to": "0x9b6b72dda5672c1865a739dadaa093268be80605",
            "value": "149035524000000000",
            "gas": 90000,
            "gasPrice": "20000000000",
            "input": "0x"
        },
        {
            "hash": "0x6f9388fe755840d7fb2df6d77df416f92f25b90cb96eeaf3e109569b03d7c1fc",
            "nonce": 24,
            "blockHash": "0x0ff4e11dd10713f86d80c71a3d3566c52b0e40f1eaa822f8c9de5df2a79b50a3",
            "blockNumber": 1455438,
            "transactionIndex": 1,
            "from": "0xfc5477d6624bf7210c554990487fd7dd27d35132",
            "to": "0x91337a300e0361bddb2e377dd4e88ccb7796663d",
            "value": "1065049280000000000",
            "gas": 21000,
            "gasPrice": "20000000000",
            "input": "0x"
        }
    ],
    "uncles": []
}
```

This makes it very easy to perform analytics on the blockchain. For example [here](https://gist.github.com/Antoine-D/a81b77a1889031711920b5e21a8fe885) is a python script that uses the block files generated to create an ordered list of all addresses by their ether balance. 

*Note that transactions where the field ```"to": null``` are contract creating-transactions.*


##Getting It Running
  1. Install geth by following the instructions for your OS [here](https://www.ethereum.org/cli).
  2. Start geth: ```geth --rpc --rpccorsdomain "http://localhost:8000"```. Note: Geth will begin syncing blocks. Depending on your system it may take more than a day of constant running to synchronize. You can speedup synchronization with ```geth sync --fast```.
  3. When you have all the ethereum blocks you want synchronized run the application with or without the optional config file named config.json in the same directory as app.js in the format:
```
{
    "output": "/temp/eth_block_files",
    "gethPort": 8545
}
```

*Note: geth must be running with ```geth --rpc --rpccorsdomain "http://localhost:8000"``` at the same time the node project is run. This allows the project access to geths web3 which it uses to quest for blocks and transactions.*
