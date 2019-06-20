const Metadata = artifacts.require('./Metadata.sol');
const RainbowCoin = artifacts.require('./RainbowCoin.sol');
const BigNumber = require('bignumber.js');

const gasPrice = 1000000000; // 1GWEI
const _ = '        ';

contract('RainbowCoin', async function (accounts) {
  let token;

  before(done => {
    (async () => {
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
        token = await RainbowCoin.deployed();

        console.log(_ + '-----------------------');
        console.log(_ + totalGas.toFormat(0) + ' - Total Gas');
        done();
      } catch (error) {
        console.error(error);
        done(false);
      }
    })();
  });

  describe('RainbowCoin.sol', function () {
    it('Should pass', async () => {
      assert(
        true === true,
        'this is true'
      )
    });

    it("Should make first account an owner", async () => {
      let instance = await RainbowCoin.deployed();
      let owner = await instance.owner();
      assert.equal(owner, accounts[0]);
    });

    it('Should return metadata uints as strings', async () => {
      const URI = 'https://rainbowco.in/metadata/';

      let instance = await RainbowCoin.deployed();
      let tokenURI_uint = 12;
      let tokenURI_result = await instance.tokenURI(tokenURI_uint);

      assert(
        URI + tokenURI_uint.toString() === tokenURI_result,
        'incorrect value "' + tokenURI_result + '" returned'
      )
    });

    it('Should mint a token from the owner account', async () => {
      let instance = await RainbowCoin.deployed();

      // Begin with zero balance
      let zeroBalance = await instance.totalSupply();
      assert(
        zeroBalance.toString(10) === '0',
        "Contract should have no tokens at this point"
      )

      // Try minting a new token and checking the totalSupply
      try {
        await instance.mint(accounts[0]);
      } catch (error) {
        console.log(error);
        assert(false, error);
      }
      let totalSupply = await instance.totalSupply();
      assert(
        totalSupply.toString(10) === '1',
        "Contract should have balance of 1 instead it has " + totalSupply.toString(10)
      )

      // check that the balance increased to 1
      let ownerBalance = await instance.balanceOf(accounts[0]);
      assert(
        ownerBalance.toString(10) === '1',
        "Owner account should have 1 token instead it has " + ownerBalance.toString(10)
      )

      // make sure the token at index 0 has id 1
      let tokenId = await instance.tokenOfOwnerByIndex(accounts[0], "0");
      assert(
        tokenId.toString(10) === '1',
        "Token at index 0 is " + tokenId.toString(10)
      )
    });
  });
});

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
    web3.currentProvider.sendAsync({
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
