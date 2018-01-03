# Ethereum Block Grabber
Creates a `<block_number>.json` file for each block from a locally running [geth](https://github.com/ethereum/go-ethereum/wiki/geth) instance. This alllows you to perform analytics on the blockchain without having to simulatenously run a geth instance or rely on an external API.

## Getting It Running
  1. [Install](https://www.ethereum.org/cli) geth and sync it (speedup syncing by adding the ```--syncmode "fast"``` argument the first time you run geth).
  2. Start geth with the HTTP-RPC server enabled: ```geth --rpc --rpccorsdomain "http://localhost:8000"```.
  3. After 20-30 seconds of geth running, run the application (```node app.js```).

## Config
The config file is optional. Without the config file it will create block files for all blocks recursively (from the latest block downloaded on your local geth instance through it's ancestors to block 0) and save them in the root directory of the project.

Running with ```config.json``` at the root of the project allows you to download specific blocks or intervals of blocks:
```json
{
    "output": "./blockfiles",
    "gethPort": 8545,
    "blocks": [ 1, {"start": 2, "end": 4}, "0xf37c632d361e0a93f08ba29b1a2c708d9caa3ee19d1ee8d2a02612bffe49f0a9"],
    "quiet": true
}
```

This configuration will:
  - download blocks: 1, [2-4] (both inclusive), and the block with hash `0xf37c632d...49f0a9` (which happens to be block number 5). 
  - save the information for each block in a file named ```<block number>.json``` in the directory ```./block_files```.
  - assume geth's RPC port is 8545 (default), you can change the port it runs on by adding the ```--rpcport <port>``` argument when running geth.

*Note: the ```blocks``` array in the config file takes an array of specific block numbers, block number ranges, and/or block hashes to download (or any combination/multiple of the 3).*

*Note: By default it will create a file for all blocks starting from the last block your geth instance has synced until it encounters a block that already has a file named ```<block's number>.json```, in which case it will stop (so in an empty directory it will create a file for all blocks from the latest block you've synced back to the genesis block).*

*Note: the python scripts in the script directory are utilities to run on the blocks' JSON files.*
