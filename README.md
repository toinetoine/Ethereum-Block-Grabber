# Ethereum Block Grabber
Grabs the entire blockchain from a specified geth instance. Each block will have a json file named ```<block number>.json``` in the output directory specified looking like [this](https://gist.github.com/Antoine-D/2067be1b72cee66b143b220edbb5b522).

This makes it very easy to perform analytics on the blockchain without having to simultaneously run an ethereum node. In the scripts folder you will some python scripts that do stuff with the downloaded block files. For example [here](https://github.com/Antoine-D/ethereum-block-grabber/blob/master/scripts/balances.py) is a python script that uses the block files generated to create an ordered list of all addresses by their ether balance. 

##Getting It Running
  1. Install geth by following the instructions for your OS [here](https://www.ethereum.org/cli).
  2. Start geth: ```geth --rpc --rpccorsdomain "http://localhost:8000"```. Note: Geth will begin syncing blocks. Depending on your system it may take more than a day of constant running to synchronize. You can speedup synchronization with ```geth sync --fast```.
  3. When you have all the ethereum blocks you want run the node application with or without a config.json file while geth is running.

##Config 
The config file is optional. Without the config file it will download block files for all files recursively (from the latest block downloaded on your local geth instance through it's ancestors to the earliest block). Running with the config file allows you to download specific blocks or intvervals of blocks.
```
{
    "output": "./blockfiles",
    "gethPort": 8545, 
    "blocks": [ 1, {"start": 2, "end": 5}, "0xf37c632d361e0a93f08ba29b1a2c708d9caa3ee19d1ee8d2a02612bffe49f0a9"],
    "quiet": true
}
```
This configuration will download block number 1, block numbers in the interval [2, 5), and the block with hash 0xf37c632d361e0a93f08ba29b1a2c708d9caa3ee19d1ee8d2a02612bffe49f0a9. It will save the block info in a file names ```<block number>.json``` in the directory ```./eth_block_files```.
*Note: the ```blocks``` array in the config file takes an array of specific block numbers, block number ranges, or block hashes to download (or any combination of the three).*

By default it will downlaod all blocks from the latest until it finds a block that already has a json file named ```<block's number>.json```, in which case it will stop (so if you specify an empty directory in the config file it will download all blocks from the latest back to the genesis block. A simple configuration to do this:
```
{
    "output": "./blockfiles"
}
```
