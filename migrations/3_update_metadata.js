var Metadata = artifacts.require('./Metadata.sol')
var Token = artifacts.require('./RainbowCoin.sol')

let _ = '        '

module.exports = (deployer, helper, accounts) => {

  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      await deployer.deploy(Metadata, {
        replace: true
      });

      let metadata = await Metadata.deployed()
      console.log(_ + 'Metadata deployed at: ' + metadata.address)

      let token = await Token.deployed()
      console.log(_ + 'RainbowCoin deployed at: ' + token.address)

      // Update the token with the new metadata address
      await token.updateMetadata(metadata.address)
      console.log(_ + 'Token metadata updated to ' + metadata.address)

    } catch (error) {
      console.log(error)
    }
  })
}
