```bash
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Warning: Both truffle-config.js and truffle.js were found. Using truffle-config.js.
Warning: Both truffle-config.js and truffle.js were found. Using truffle-config.js.

Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 0x6691b7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x8c135279be0848c2cbda82b3c83ccee2aa5f207cccab2c9b315add0ddcc784db
   > Blocks: 0            Seconds: 0
   > contract address:    0x3fbf38e65cc683C2dFF70BfE8359d0DEEe3fa720
   > block number:        1
   > block timestamp:     1561054830
   > account:             0xba3CEB7091657053c059D6fD58537534890fFb5A
   > balance:             99.99477214
   > gas used:            261393
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00522786 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00522786 ETH


2_deploy_contracts.js
=====================

   Deploying 'Metadata'
   --------------------
   > transaction hash:    0xe293b7c864c1bb3f9364aab42864ecb2c7daf943eafdb15adf6f6809cd3fb4a6
   > Blocks: 0            Seconds: 0
   > contract address:    0x02Ad3D47A29Ba4C7aaE2EbEb3F8e11294259378f
   > block number:        3
   > block timestamp:     1561054830
   > account:             0xba3CEB7091657053c059D6fD58537534890fFb5A
   > balance:             99.98632282
   > gas used:            380443
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00760886 ETH

        Metadata deployed at: 0x02Ad3D47A29Ba4C7aaE2EbEb3F8e11294259378f

   Deploying 'RainbowCoin'
   -----------------------
   > transaction hash:    0x86be4e3d76d3336c4fc24e6f90b3ec56b6a7b47ec2f31bfe5215df19513fb73d
   > Blocks: 0            Seconds: 0
   > contract address:    0x3CEdA5B0bD1e7F8ED6af5041F131C09A1c182CCA
   > block number:        4
   > block timestamp:     1561054830
   > account:             0xba3CEB7091657053c059D6fD58537534890fFb5A
   > balance:             99.94029064
   > gas used:            2301609
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04603218 ETH

        RainbowCoin deployed at: 0x3CEdA5B0bD1e7F8ED6af5041F131C09A1c182CCA

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.05364104 ETH


3_update_metadata.js
====================

   Replacing 'Metadata'
   --------------------
   > transaction hash:    0x6d290706bd39917edde236adb8f18c4199fa68afc84d793079578ae8de977b8d
   > Blocks: 0            Seconds: 0
   > contract address:    0x44D78DCb0B36b69df0bF218AfC4EaB08B9AAE623
   > block number:        6
   > block timestamp:     1561054830
   > account:             0xba3CEB7091657053c059D6fD58537534890fFb5A
   > balance:             99.93214132
   > gas used:            380443
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00760886 ETH

        Metadata deployed at: 0x44D78DCb0B36b69df0bF218AfC4EaB08B9AAE623
        RainbowCoin deployed at: 0x3CEdA5B0bD1e7F8ED6af5041F131C09A1c182CCA
        Token metadata updated to 0x44D78DCb0B36b69df0bF218AfC4EaB08B9AAE623

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00760886 ETH


Summary
=======
> Total deployments:   4
> Final cost:          0.06647776 ETH
```
