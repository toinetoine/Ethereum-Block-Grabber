# Ethereum Block Grabber
Grabs all blocks on the ethereum blockchain from a specified geth instance

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
