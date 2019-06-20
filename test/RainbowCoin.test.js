var Metadata = artifacts.require('./Metadata.sol');
var RainbowCoin = artifacts.require('./RainbowCoin.sol');
var BigNumber = require('bignumber.js');
let gasPrice = 1000000000; // 1GWEI

let _ = '        ';

contract('RainbowCoin', async function (accounts) {
  let token;

  before(done => {
    ;(async () => {
      try {
        var totalGas = new BigNumber(0)

        // Deploy Metadata.sol
        metadata = await Metadata.new();
        var tx = await web3.eth.getTransactionReceipt(metadata.transactionHash);
        totalGas = totalGas.plus(tx.gasUsed);
        console.log(_ + tx.gasUsed + ' - Deploy Metadata');
        metadata = await Metadata.deployed();

        // Deploy RainbowCoin.sol
        token = await RainbowCoin.new();
        var tx = await web3.eth.getTransactionReceipt(token.transactionHash);
        totalGas = totalGas.plus(tx.gasUsed);
        console.log(_ + tx.gasUsed + ' - Deploy RainbowCoin');
        token = await Sample.deployed();

        console.log(_ + '-----------------------');
        console.log(_ + totalGas.toFormat(0) + ' - Total Gas');
        done();
      } catch (error) {
        console.error(error);
        done(false);
      }
    })()
  })

  describe('RainbowCoin.sol', function () {
    it('should pass', async function() {
      assert(
        true === true,
        'this is true'
      )
    });

    it('should return metadata uints as strings', async function () {
      const URI = 'https://rainbowco.in/metadata/'

      let tokenURI_uint = 122312;
      let tokenURI_result = await token.tokenURI(tokenURI_uint);
      assert(
        URI + tokenURI_uint.toString() === tokenURI_result,
        'incorrect value "' + tokenURI_result + '" returned'
      )
    });

    it('should mint a token from the owner account', async function () {
      // begin with zero balance
      let zeroBalance = await token.totalSupply();
      assert(
        zeroBalance.toString(10) === '0',
        "Contract should have no tokens at this point"
      )

      // try minting a new token and checking the totalSupply
      try {
        await token.mint(accounts[0]);
      } catch (error) {
        console.log(error);
        assert(false, error);
      }
      let totalSupply = await token.totalSupply();
      assert(
        totalSupply.toString(10) === '1',
        "Contract should have balance of 1 instead it has " + totalSupply.toString(10)
      )

      // check that the balance increased to 1
      let ownerBalance = await token.balanceOf(accounts[0]);
      assert(
        ownerBalance.toString(10) === '1',
        "Owner account should have 1 token instead it has " + ownerBalance.toString(10)
      )

      // make sure the token at index 0 has id 1
      let tokenId = await token.tokenOfOwnerByIndex(accounts[0], "0");
      assert(
        tokenId.toString(10) === '1',
        "Token at index 0 is " + tokenId.toString(10)
      )
    });
  })
})

function getBlockNumber() {
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}

function increaseBlocks(blocks) {
  return new Promise((resolve, reject) => {
    increaseBlock().then(() => {
      blocks -= 1
      if (blocks == 0) {
        resolve()
      } else {
        increaseBlocks(blocks).then(resolve)
      }
    })
  })
}

function increaseBlock() {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync(
      {
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: 12345
      },
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

function decodeEventString(hexVal) {
  return hexVal
    .match(/.{1,2}/g)
    .map(a =>
      a
        .toLowerCase()
        .split('')
        .reduce(
          (result, ch) => result * 16 + '0123456789abcdefgh'.indexOf(ch),
          0
        )
    )
    .map(a => String.fromCharCode(a))
    .join('')
}
