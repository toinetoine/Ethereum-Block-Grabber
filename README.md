# Ethereum Block Grabber
Grabs the entire blockchain from a specified geth instance. Each block will have a json file in the output directory specified looking like [this](https://gist.github.com/Antoine-D/2067be1b72cee66b143b220edbb5b522).

This makes it very easy to perform analytics on the blockchain. For example [here](https://gist.github.com/Antoine-D/a81b77a1889031711920b5e21a8fe885) is a python script that uses the block files generated to create an ordered list of all addresses by their ether balance. 

*Note that transactions where the field ```"to": null``` are contract creating-transactions.*

##Getting It Running
  1. Install geth by following the instructions for your OS [here](https://www.ethereum.org/cli).
  2. Start geth: ```geth --rpc --rpccorsdomain "http://localhost:8000"```. Note: Geth will begin syncing blocks. Depending on your system it may take more than a day of constant running to synchronize. You can speedup synchronization with ```geth sync --fast```.
  3. When you have all the ethereum blocks you want synchronized run the application while geth is running.

##Config 
The config file is optional. Without the config file it will download block files for all files recurivly (from the latest block downloaded on your local geth instance through it's ancestors to the earliest block). Running with the config file allows you to download specific blocks or intvervals of blocks.
```
{
    "output": "./eth_block_files",
    "gethPort": 8545, 
    "blocks": [ 1, {"start": 2, "end": 5}, "0xf37c632d361e0a93f08ba29b1a2c708d9caa3ee19d1ee8d2a02612bffe49f0a9"],
    "quiet": true
}
```
This configuration will download block number 1, block numbers in the interval [2, 5), and the block with hash 0xf37c632d361e0a93f08ba29b1a2c708d9caa3ee19d1ee8d2a02612bffe49f0a9. It will save the block info in a file names ```<block number>.json``` in the directory ```./eth_block_files```.
*Note: the ```blocks``` array in the config file takes an array of specific block numbers, block number ranges, or block hashes to download (or any combination of the three).*

*Note: geth must be running with ```geth --rpc --rpccorsdomain "http://localhost:8000"``` at the same time the node project is run. This allows the project access to geths web3 which it uses to quest for blocks and transactions.*
